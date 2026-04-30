export function mapProduct(product) {
  return {
    id: product.id || product._id,
    name: product.name,
    description: product.description,
    price: Number(product.price) || 0,
    category: product.category,
    image: product.image,
    images: product.images || [],
    tags: product.tags || [],
    menuType: product.menuType || 'meal',
    isFeatured: Boolean(product.isFeatured),
    isAvailable: product.isAvailable !== false,
    currency: product.currency || 'NGN',
    slug: product.slug,
  }
}
