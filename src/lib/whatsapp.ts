import { CartItem } from '@/store/cartStore'
import { Product } from '@/types/product'

export function generateWhatsAppMessage(
  items: CartItem[],
  total: number
): string {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.product.brand ? item.product.brand + ' - ' : ''}${item.product.name}\n  Quantité: ${item.quantity} x ${item.product.price.toFixed(2)} DH = ${(item.quantity * item.product.price).toFixed(2)} DH`
    )
    .join('\n\n')

  const message = `
🛍️ *NOUVELLE COMMANDE - YAHYA PARFUMERIE*

*Produits commandés:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*TOTAL: ${total.toFixed(2)} DH*
━━━━━━━━━━━━━━━━━━━━

📦 Livraison gratuite
🎁 Merci pour votre confiance!
`.trim()

  return message
}

export function generateWhatsAppLink(
  items: CartItem[],
  total: number,
  businessPhone: string = '212655984300' // Your WhatsApp number
): string {
  const message = generateWhatsAppMessage(items, total)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${businessPhone}?text=${encodedMessage}`
}

// Single product WhatsApp checkout
export function generateSingleProductWhatsAppMessage(
  product: Product,
  quantity: number = 1
): string {
  const total = product.price * quantity

  const message = `
🛍️ *NOUVELLE COMMANDE - YAHYA PARFUMERIE*

*Produit commandé:*
• ${product.brand ? product.brand + ' - ' : ''}${product.name}
  Quantité: ${quantity} x ${product.price.toFixed(2)} DH = ${total.toFixed(2)} DH

━━━━━━━━━━━━━━━━━━━━
*TOTAL: ${total.toFixed(2)} DH*
━━━━━━━━━━━━━━━━━━━━

📦 Livraison gratuite
🎁 Merci pour votre confiance!
`.trim()

  return message
}

export function generateSingleProductWhatsAppLink(
  product: Product,
  quantity: number = 1,
  businessPhone: string = '212655984300'
): string {
  const message = generateSingleProductWhatsAppMessage(product, quantity)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${businessPhone}?text=${encodedMessage}`
}