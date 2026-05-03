export function whatsappLink(opts: { message: string }): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!
  return `https://wa.me/${phone}?text=${encodeURIComponent(opts.message)}`
}

export function propertyWhatsappMessage(opts: { title: string; url: string }): string {
  return `Hi, I'm interested in: ${opts.title}\n${opts.url}\n\nCould you please share more details?`
}
