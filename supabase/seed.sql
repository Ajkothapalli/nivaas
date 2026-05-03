-- Seed properties for marketing site
-- Run after migration. Uses the same UUIDs as data/properties.json so they stay in sync.

insert into properties (id, slug, title, locality, address_line, lat, lng, description, amenities, images, status)
values
  ('a1b2c3d4-0001-4000-8000-000000000001', 'prestige-gachibowli-3bhk-01', 'Bright 3 BHK in Gachibowli Near DLF Cyber City', 'gachibowli', 'Inorbit Mall Road, Gachibowli, Hyderabad 500032', 17.4401, 78.3489, 'A well-maintained 3 BHK flat on the 8th floor...', '["Air conditioning", "High-speed WiFi"]'::jsonb, '["/properties/prestige-gachibowli-3bhk-01/living.jpg"]'::jsonb, 'available'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'jubilee-madhapur-2bhk-01', 'Cosy 2 BHK in Madhapur Walking Distance to Cyber Towers', 'madhapur', 'Phase 1, Madhapur, Hyderabad 500081', 17.4486, 78.3908, 'This 2 BHK apartment sits in a quiet lane...', '["Air conditioning", "High-speed WiFi"]'::jsonb, '["/properties/jubilee-madhapur-2bhk-01/living.jpg"]'::jsonb, 'available'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'rainbow-kondapur-2bhk-02', 'Spacious 2 BHK in Kondapur Near Botanical Gardens', 'kondapur', 'Kothaguda X Roads, Kondapur, Hyderabad 500084', 17.4611, 78.3607, 'Located minutes from Kondapur...', '["Air conditioning", "Modular kitchen"]'::jsonb, '["/properties/rainbow-kondapur-2bhk-02/living.jpg"]'::jsonb, 'available'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'skyline-hitec-3bhk-01', 'Premium 3 BHK in HITEC City Near Mindspace', 'hitec-city', 'Raheja Mindspace, HITEC City, Hyderabad 500081', 17.4518, 78.3762, 'One of Nivaas''s flagship homes...', '["Air conditioning", "Swimming pool"]'::jsonb, '["/properties/skyline-hitec-3bhk-01/living.jpg"]'::jsonb, 'available'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'green-fd-2bhk-01', 'Contemporary 2 BHK in Financial District Near Nanakramguda', 'financial-district', 'Nanakramguda, Financial District, Hyderabad 500032', 17.4249, 78.3495, 'A 2 BHK apartment in the rapidly growing Financial District...', '["Air conditioning", "High-speed WiFi"]'::jsonb, '["/properties/green-fd-2bhk-01/living.jpg"]'::jsonb, 'available');

-- Seed one unit per property (matching JSON data)
insert into units (property_id, bhk, area_sqft, rent_monthly, deposit, furnishing, available_from, status)
values
  ('a1b2c3d4-0001-4000-8000-000000000001', 3, 1650, 42000, 84000, 'fully_furnished', '2025-07-01', 'vacant'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 2, 1100, 28000, 56000, 'fully_furnished', '2025-06-15', 'vacant'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 2, 1250, 25000, 50000, 'semi_furnished', '2025-07-15', 'vacant'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 3, 1850, 45000, 90000, 'fully_furnished', '2025-06-01', 'vacant'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 2, 1300, 32000, 64000, 'fully_furnished', '2025-08-01', 'vacant');
