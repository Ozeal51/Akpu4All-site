const products = [
  { name: 'Akpu with Ofe Nsala', description: 'Delicious akpu served with spicy ofe nsala and assorted meat.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/1327486579/photo/abak-soup-with-fufu-or-pounded-yam.jpg?s=612x612&w=0&k=20&c=i9WYYbJ4WeHdMXXiLFKFJL8yNyRQr8shPzsOAoc_SKo=', isFeatured: true, tags: ['akpu', 'soup'] },
  { name: 'Amala with Any soup', description: 'Freshly made amala with your choice of soup and meat.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/1169415720/photo/regional-african-food.jpg?s=612x612&w=0&k=20&c=C6vcHrbpoKC8E513QJlDO_hhJLdrt5VRjky2gQ8wnRU=', tags: ['amala', 'soup'] },
  { name: 'Okra soup with swallow of your choice', description: 'Freshly made Okra soup with your choice of swallow.', price: 7500, category: 'Soups', menuType: 'meal', image: 'https://media.istockphoto.com/id/1406317293/photo/nigerian-okra-okro-soup.jpg?s=612x612&w=0&k=20&c=gH7RWfFcALDFrJ6o1lLY85CCSZH9tFe6B0LY1cS8b6o=', tags: ['okra', 'soup'] },
  { name: 'Semo with Egusi and beef', description: 'Deliciious Egusi soup with beef and semo freshly made.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/2195435155/photo/pounded-yam-vegetable-soup-and-stew-with-liver-and-pommo.jpg?s=612x612&w=0&k=20&c=ij8rvKuKjiK8nU38-N70O1G_ez1DSGJZHnJR-mghQRg=', tags: ['egusi', 'semo'] },
  { name: 'Pounded yam with Banga soup', description: 'Delicious pounded yam served with rich Banga soup and assorted meats.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/1091151430/photo/nigerian-pounded-yam-wrapped-in-plastic-served-with-banga-soup.jpg?s=612x612&w=0&k=20&c=hyFIwWiPC-mlUM-hB7i7y1V-dwzqcG7XpoBT5cy7vKg=', tags: ['banga', 'pounded yam'] },
  { name: 'Akpu with Vegetable soup', description: 'Fresh Akpu with vegetable soup.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/2213435988/photo/efo-riro-fufu.jpg?s=612x612&w=0&k=20&c=O50IWpjgti7Se8uw_egkPLdS-BvtePXHM1_SDzis6MQ=', tags: ['akpu', 'vegetable soup'] },
  { name: 'Oha soup with Garri', description: 'Welcome home delicious oha soup.', price: 7500, category: 'Main Dishes', menuType: 'meal', image: 'https://media.istockphoto.com/id/1327486555/photo/oha-or-ora-soup-with-beef-and-garri.jpg?s=612x612&w=0&k=20&c=iQ_k0Ud7j5uqNDVT8s9HJ-3IiSHuquef2U7xgqS-tX0=', tags: ['oha', 'garri'] },
  { name: 'Garri with fresh vegetable soup and assorted meat', description: 'Delicious garri served with fresh vegetable soup and assorted meat.', price: 7500, category: 'Sides', menuType: 'meal', image: 'https://media.istockphoto.com/id/1373169941/photo/afang-soup.jpg?s=612x612&w=0&k=20&c=OxEiHp0fd-LOa1FBatSvepOr7skLrxCN-pMspou6d7c=', tags: ['garri', 'vegetable soup'] },
  { name: 'Vegetabl soup with any swallow of your choice', description: 'Fresh vegetable soup served with your choice of swallow.', price: 7500, category: 'Soups', menuType: 'meal', image: 'https://media.istockphoto.com/id/1406318658/photo/nigerian-okra-or-okro-soup.jpg?s=612x612&w=0&k=20&c=tousjvvx98KUJFygBK3WOT1KrCt6VDW2rFM5ZRD3oJE=', tags: ['vegetable soup'] },
  { name: 'Afang soup with swallow of your choice', description: 'Rich and flavorful Afang soup served with your choice of swallow.', price: 7500, category: 'Soups', menuType: 'meal', image: 'https://media.istockphoto.com/id/1327486551/photo/afang-soup.jpg?s=612x612&w=0&k=20&c=mc1DHGXBQJFFxUbeGxYX0n98CuTh4XUY2Lqx8dCTR38=', tags: ['afang', 'soup'] },
  { name: 'Ogbono,Vegetable, Egusi, Oha, Afang, white soup,black soup, okra,', description: 'Available soups with your choiced swallow.', price: 7500, category: 'Soups', menuType: 'meal', image: 'https://media.istockphoto.com/id/1158535534/photo/various-nigerian-dishes-on-buffet-at-party.jpg?s=612x612&w=0&k=20&c=r9hMWNHx8LyGXe8tpkYHr8pPzPA2sJs2KUkpq7YYMCA=', tags: ['assorted soups'] },
  { name: 'Amala with egusi soup and assorted meat', description: 'Delicious Amala served with rich egusi soup and assorted meat.', price: 7500, category: 'African delicacies', menuType: 'meal', image: 'https://media.istockphoto.com/id/1169416027/photo/regional-african-food.jpg?s=612x612&w=0&k=20&c=F6l5BbDep60lvYoD1YhYmEg7PuPvIvoUCuP1K5A7yJ0=', tags: ['amala', 'egusi'] },
  { name: 'Fresh Zobo Drink', description: 'Chilled hibiscus zobo served fresh and naturally sweetened.', price: 1500, category: 'Drinks', menuType: 'drink', image: 'https://media.istockphoto.com/id/1393619744/photo/iced-roselle-in-glass-on-wooden-table-for-healthy-herbal-drink-and-cool-drink-concept.jpg?s=612x612&w=0&k=20&c=bO8JsvEoWhazQm4bB5nsLG9sUER_2r4nV2lu8N0kf2w=', tags: ['zobo'] },
  { name: 'Fresh Palm Wine', description: 'Traditional palm wine served cold for a smooth local taste.', price: 3500, category: 'Drinks', menuType: 'drink', image: 'https://media.istockphoto.com/id/1094643668/photo/palm-wine-in-bottles.jpg?s=612x612&w=0&k=20&c=gLFF6DIr-64HFJi72a4b3Lzh1b_dKcEhnqGYrgbeUQs=', tags: ['palm wine'] },
  { name: 'Tropical Fruit Juice', description: 'Fresh mixed fruit juice blend packed with tropical flavor.', price: 4000, category: 'Drinks', menuType: 'drink', image: 'https://media.istockphoto.com/id/821583034/photo/various-fruits-juices.jpg?s=612x612&w=0&k=20&c=oHI_Qv-Ci2vRjiJFYcFY40F-nPGJCRvw6fTHhM-TyUg=', tags: ['juice'] },
  { name: 'Sparkling Bottle Water', description: 'Refreshing bottled water to pair with any meal.', price: 500, category: 'Drinks', menuType: 'drink', image: 'https://media.istockphoto.com/id/866929570/photo/closeup-on-mineral-water-bottles-in-raw-and-lines.jpg?s=612x612&w=0&k=20&c=EOFuWy7oAOzmyWFWcCxoGQjdYfJyvSNpeO_BHr8kSME=', tags: ['water'] },
]

const users = [
  { name: 'Admin User', email: 'admin@akpu4all.com', password: 'Admin123!', phone: '08000000001', role: 'admin', avatar: '' },
  { name: 'Demo Customer', email: 'customer@akpu4all.com', password: 'Customer123!', phone: '08000000002', role: 'user', avatar: '' },
]

const vendors = [
  {
    businessName: 'Akpu4All Kitchen',
    description: 'Primary in-house kitchen powering the Akpu4All menu.',
    email: 'hello@akpu4all.com',
    phone: '08000000003',
    logo: '',
    category: 'Restaurant',
    address: '1 Akpu Street',
    city: 'Enugu',
    state: 'Enugu',
    commissionRate: 5,
    socialLinks: { website: 'https://akpu4all.com', instagram: '', whatsapp: 'https://wa.me/2349021927275' },
  },
]

const orders = [
  {
    orderNumber: 'ORD-SEED-1001',
    customer: { name: 'Demo Customer', email: 'customer@akpu4all.com', phone: '08000000002', address: '12 Market Road, Enugu' },
    delivery: { address: '12 Market Road, Enugu', city: 'Enugu', notes: 'Call on arrival', deliveryWindow: 'ASAP' },
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
    status: 'confirmed',
    notes: 'Seed order for restaurant workflow',
    pricing: { subtotal: 0, deliveryFee: 500, tax: 0, discount: 0, total: 0 },
    items: [
      { productName: 'Akpu with Ofe Nsala', quantity: 1 },
      { productName: 'Fresh Zobo Drink', quantity: 2 },
    ],
  },
  {
    orderNumber: 'ORD-SEED-1002',
    customer: { name: 'Admin User', email: 'admin@akpu4all.com', phone: '08000000001', address: '1 Akpu Street, Enugu' },
    delivery: { address: '1 Akpu Street, Enugu', city: 'Enugu', notes: 'Internal test order', deliveryWindow: 'Evening' },
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    status: 'preparing',
    notes: 'Internal quality assurance order',
    pricing: { subtotal: 0, deliveryFee: 0, tax: 0, discount: 0, total: 0 },
    items: [
      { productName: 'Amala with egusi soup and assorted meat', quantity: 1 },
      { productName: 'Sparkling Bottle Water', quantity: 3 },
    ],
  },
]

const transactions = [
  {
    transactionNumber: 'TXN-SEED-1001',
    reference: 'REF-SEED-1001',
    provider: 'manual',
    channel: 'web',
    amount: 0,
    currency: 'NGN',
    status: 'success',
    fees: 0,
    notes: 'Seed transaction for demo customer order',
  },
  {
    transactionNumber: 'TXN-SEED-1002',
    reference: 'REF-SEED-1002',
    provider: 'manual',
    channel: 'web',
    amount: 0,
    currency: 'NGN',
    status: 'success',
    fees: 0,
    notes: 'Seed transaction for internal order',
  },
]

module.exports = { products, users, vendors, orders, transactions }
