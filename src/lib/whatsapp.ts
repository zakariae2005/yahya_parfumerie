import { CartItem } from '@/lib/cart-context'

export function generateWhatsAppMessage(
  items: CartItem[],
  total: number,
  customerInfo: {
    name: string
    phone: string
    address: string
    city: string
  }
): string {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.product.brand} - ${item.product.name}\n  Quantité: ${item.quantity} x ${item.product.price}€ = ${item.quantity * item.product.price}€`
    )
    .join('\n')

  const message = `
*NOUVELLE COMMANDE - LUXE BEAUTÉ*

*Informations client:*
Nom: ${customerInfo.name}
Téléphone: ${customerInfo.phone}
Adresse: ${customerInfo.address}, ${customerInfo.city}

*Produits commandés:*
${itemsList}

*Résumé commande:*
Sous-total: ${total}€
Frais de port: Gratuit
*Total: ${total}€*

Merci pour votre commande!
`.trim()

  return message
}

export function generateWhatsAppLink(
  items: CartItem[],
  total: number,
  customerInfo: {
    name: string
    phone: string
    address: string
    city: string
  },
  businessPhone: string = '212612345678' // Default Moroccan number format
): string {
  const message = generateWhatsAppMessage(items, total, customerInfo)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${businessPhone}?text=${encodedMessage}`
}
