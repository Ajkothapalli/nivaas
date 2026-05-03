-- enums
create type user_role as enum ('tenant', 'owner', 'admin');
create type property_status as enum ('draft', 'available', 'reserved', 'rented', 'maintenance');
create type unit_status as enum ('vacant', 'reserved', 'occupied', 'notice', 'maintenance');
create type lease_status as enum ('draft', 'active', 'expiring', 'terminated');
create type inquiry_status as enum ('new', 'contacted', 'visit_scheduled', 'closed_won', 'closed_lost');
create type owner_lead_status as enum ('new', 'contacted', 'qualified', 'onboarded', 'lost');
create type furnishing_type as enum ('fully_furnished', 'semi_furnished', 'unfurnished');

-- profiles (links to auth.users; populated when auth ships)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null default 'tenant',
  full_name text,
  phone text unique,
  email text,
  kyc_status text default 'none',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- owners (extends profile; populated month 4+)
create table owners (
  id uuid primary key references profiles on delete cascade,
  address text,
  pan text,
  gst text,
  bank_account_masked text,
  created_at timestamptz default now()
);

-- tenants (extends profile; populated month 6+)
create table tenants (
  id uuid primary key references profiles on delete cascade,
  employer text,
  emergency_contact text,
  created_at timestamptz default now()
);

-- properties (POPULATED TODAY for marketing)
create table properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references owners on delete set null,
  slug text unique not null,
  title text not null,
  locality text not null,
  address_line text,
  lat numeric(10, 7),
  lng numeric(10, 7),
  description text,
  amenities jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  status property_status not null default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_properties_status on properties(status);
create index idx_properties_locality on properties(locality);

-- units (POPULATED TODAY — one unit per property at first; co-living later)
create table units (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties on delete cascade,
  label text,
  bhk smallint not null,
  area_sqft int,
  rent_monthly int not null,
  deposit int not null,
  furnishing furnishing_type not null,
  available_from date,
  status unit_status not null default 'vacant',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_units_status on units(status);
create index idx_units_property on units(property_id);

-- master leases (company ↔ owner; empty today, populated month 4+)
create table master_leases (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties,
  owner_id uuid not null references owners,
  start_date date not null,
  end_date date not null,
  monthly_payout int not null,
  lock_in_months smallint default 12,
  escalation_pct numeric(5,2) default 5.0,
  deposit_held int default 0,
  status lease_status not null default 'draft',
  created_at timestamptz default now()
);

-- subleases (company ↔ tenant; empty today, populated month 6+)
create table subleases (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units,
  tenant_id uuid not null references tenants,
  start_date date not null,
  end_date date not null,
  monthly_rent int not null,
  deposit int not null,
  lock_in_months smallint default 6,
  status lease_status not null default 'draft',
  created_at timestamptz default now()
);

-- inquiries (POPULATED TODAY — tenant interest captured from site)
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units on delete set null,
  name text not null,
  phone text not null,
  move_in_date date,
  message text,
  source_page text,
  status inquiry_status not null default 'new',
  created_at timestamptz default now()
);

-- owner leads (POPULATED TODAY)
create table owner_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  locality text,
  num_properties smallint,
  property_type text,
  expected_rent int,
  furnishing_type furnishing_type,
  message text,
  status owner_lead_status not null default 'new',
  created_at timestamptz default now()
);

-- visits (empty today; populated month 6+)
create table visits (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units,
  inquiry_id uuid references inquiries,
  tenant_id uuid references tenants,
  scheduled_at timestamptz not null,
  status text default 'scheduled',
  created_at timestamptz default now()
);

-- documents (empty today; month 6+)
create table documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references owners,
  tenant_id uuid references tenants,
  doc_type text not null,
  storage_path text not null,
  created_at timestamptz default now()
);

-- payments (empty today; month 12+)
create table payments (
  id uuid primary key default gen_random_uuid(),
  sublease_id uuid references subleases,
  amount int not null,
  status text not null default 'pending',
  razorpay_payment_id text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- payouts (empty today; month 18+)
create table payouts (
  id uuid primary key default gen_random_uuid(),
  master_lease_id uuid not null references master_leases,
  amount int not null,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- audit log
create table audit_log (
  id bigserial primary key,
  actor_id uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  before jsonb,
  after jsonb,
  at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table owners enable row level security;
alter table tenants enable row level security;
alter table properties enable row level security;
alter table units enable row level security;
alter table master_leases enable row level security;
alter table subleases enable row level security;
alter table inquiries enable row level security;
alter table owner_leads enable row level security;
alter table visits enable row level security;
alter table documents enable row level security;
alter table payments enable row level security;
alter table payouts enable row level security;

create policy "public can read available properties"
  on properties for select
  using (status = 'available');

create policy "public can read vacant units"
  on units for select
  using (status = 'vacant');
