import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdateProductInput } from '@/types/product'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }   = await params
    const body: UpdateProductInput = await request.json()

    const existingProduct = await prisma.product.findUnique({ where: { id } })
    if (!existingProduct) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(body.name         !== undefined && { name:         body.name }),
        ...(body.brand        !== undefined && { brand:        body.brand }),
        ...(body.price        !== undefined && { price:        body.price }),
        ...(body.description  !== undefined && { description:  body.description }),
        ...(body.category     !== undefined && { category:     body.category }),
        ...(body.subcategory  !== undefined && { subcategory:  body.subcategory }),
        ...(body.megacategory !== undefined && { megacategory: body.megacategory }), // ← new
        ...(body.images       !== undefined && { images:       body.images }),
        ...(body.rating       !== undefined && { rating:       body.rating }),
        ...(body.reviews      !== undefined && { reviews:      body.reviews }),
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const existingProduct = await prisma.product.findUnique({ where: { id } })
    if (!existingProduct) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}