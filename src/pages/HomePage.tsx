import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'furniture', name: 'Furniture', icon: '🪑' },
  { id: 'cosmetics', name: 'Cosmetics', icon: '💄' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'books', name: 'Books', icon: '📚' },
];

const SAMPLE_PRODUCTS = [
  // Electronics
  {
    id: 'e1',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'SoundMax',
    seller: { id: 's1', name: 'Tech Haven', rating: 4.8 }
  },
  {
    id: 'e2',
    name: '4K Smart TV',
    slug: '4k-smart-tv',
    description: '55-inch 4K Ultra HD Smart LED TV with HDR',
    price: 699.99,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'VisionTech',
    seller: { id: 's2', name: 'Electronics Pro', rating: 4.7 }
  },
  {
    id: 'e3',
    name: 'Gaming Laptop',
    slug: 'gaming-laptop',
    description: 'High-performance gaming laptop with RTX 4080 graphics',
    price: 1999.99,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'TechPro',
    seller: { id: 's3', name: 'Gaming World', rating: 4.9 }
  },
  {
    id: 'e4',
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a8df?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'TechPro',
    seller: { id: 's1', name: 'Tech Haven', rating: 4.8 }
  },
  {
    id: 'e5',
    name: 'Smart Watch',
    slug: 'smart-watch',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'TechPro',
    seller: { id: 's4', name: 'Smart Gadgets', rating: 4.6 }
  },
  {
    id: 'e6',
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Portable waterproof Bluetooth speaker with 20-hour battery',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'SoundMax',
    seller: { id: 's1', name: 'Tech Haven', rating: 4.8 }
  },
  {
    id: 'e7',
    name: 'Digital Camera',
    slug: 'digital-camera',
    description: 'Mirrorless digital camera with 4K video recording',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'VisionTech',
    seller: { id: 's5', name: 'Camera World', rating: 4.9 }
  },
  {
    id: 'e8',
    name: 'Gaming Console',
    slug: 'gaming-console',
    description: 'Next-gen gaming console with 4K graphics support',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'GamePro',
    seller: { id: 's3', name: 'Gaming World', rating: 4.9 }
  },
  {
    id: 'e9',
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'SoundMax',
    seller: { id: 's1', name: 'Tech Haven', rating: 4.8 }
  },
  {
    id: 'e10',
    name: 'Tablet',
    slug: 'tablet',
    description: '10-inch tablet with retina display and M2 chip',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    brand: 'TechPro',
    seller: { id: 's2', name: 'Electronics Pro', rating: 4.7 }
  },

  // Furniture
  {
    id: 'f1',
    name: 'Modern Sofa',
    slug: 'modern-sofa',
    description: 'Contemporary 3-seater sofa with premium fabric',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'HomeStyle',
    seller: { id: 'f1', name: 'Furniture Plus', rating: 4.6 }
  },
  {
    id: 'f2',
    name: 'Dining Table Set',
    slug: 'dining-table-set',
    description: '6-seater wooden dining table set with chairs',
    price: 799.99,
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'WoodCraft',
    seller: { id: 'f2', name: 'Wood Masters', rating: 4.8 }
  },
  {
    id: 'f3',
    name: 'Queen Bed Frame',
    slug: 'queen-bed-frame',
    description: 'Modern queen size bed frame with storage',
    price: 599.99,
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'HomeStyle',
    seller: { id: 'f1', name: 'Furniture Plus', rating: 4.6 }
  },
  {
    id: 'f4',
    name: 'Bookshelf',
    slug: 'bookshelf',
    description: '5-tier modern bookshelf with adjustable shelves',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'WoodCraft',
    seller: { id: 'f2', name: 'Wood Masters', rating: 4.8 }
  },
  {
    id: 'f5',
    name: 'Office Chair',
    slug: 'office-chair',
    description: 'Ergonomic mesh office chair with lumbar support',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'ErgoComfort',
    seller: { id: 'f3', name: 'Office Solutions', rating: 4.7 }
  },
  {
    id: 'f6',
    name: 'Coffee Table',
    slug: 'coffee-table',
    description: 'Modern glass and wood coffee table',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'HomeStyle',
    seller: { id: 'f1', name: 'Furniture Plus', rating: 4.6 }
  },
  {
    id: 'f7',
    name: 'Wardrobe',
    slug: 'wardrobe',
    description: 'Large wooden wardrobe with mirror and drawers',
    price: 699.99,
    imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'WoodCraft',
    seller: { id: 'f2', name: 'Wood Masters', rating: 4.8 }
  },
  {
    id: 'f8',
    name: 'TV Stand',
    slug: 'tv-stand',
    description: 'Modern TV stand with cable management',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'HomeStyle',
    seller: { id: 'f1', name: 'Furniture Plus', rating: 4.6 }
  },
  {
    id: 'f9',
    name: 'Side Table',
    slug: 'side-table',
    description: 'Wooden side table with storage drawer',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'WoodCraft',
    seller: { id: 'f2', name: 'Wood Masters', rating: 4.8 }
  },
  {
    id: 'f10',
    name: 'Storage Ottoman',
    slug: 'storage-ottoman',
    description: 'Fabric storage ottoman with tufted top',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    category: 'furniture',
    brand: 'HomeStyle',
    seller: { id: 'f1', name: 'Furniture Plus', rating: 4.6 }
  },

  // Cosmetics
  {
    id: 'c1',
    name: 'Face Cream',
    slug: 'face-cream',
    description: 'Hydrating face cream for all skin types',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'PureGlow',
    seller: { id: 'c1', name: 'Beauty Essentials', rating: 4.9 }
  },
  {
    id: 'c2',
    name: 'Lipstick Set',
    slug: 'lipstick-set',
    description: 'Set of 4 long-lasting matte lipsticks',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'Glamour',
    seller: { id: 'c2', name: 'Makeup Studio', rating: 4.8 }
  },
  {
    id: 'c3',
    name: 'Eye Shadow Palette',
    slug: 'eye-shadow-palette',
    description: '18-color professional eyeshadow palette',
    price: 45.99,
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'Glamour',
    seller: { id: 'c2', name: 'Makeup Studio', rating: 4.8 }
  },
  {
    id: 'c4',
    name: 'Mascara',
    slug: 'mascara',
    description: 'Volumizing waterproof mascara',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1587754256282-a11d04e3472d?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'PureGlow',
    seller: { id: 'c1', name: 'Beauty Essentials', rating: 4.9 }
  },
  {
    id: 'c5',
    name: 'Foundation',
    slug: 'foundation',
    description: 'Long-lasting liquid foundation with SPF 30',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1590156206657-aec9b2c46b6a?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'Glamour',
    seller: { id: 'c2', name: 'Makeup Studio', rating: 4.8 }
  },
  {
    id: 'c6',
    name: 'Skincare Set',
    slug: 'skincare-set',
    description: 'Complete 5-step skincare routine set',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'PureGlow',
    seller: { id: 'c1', name: 'Beauty Essentials', rating: 4.9 }
  },
  {
    id: 'c7',
    name: 'Nail Polish Set',
    slug: 'nail-polish-set',
    description: 'Set of 6 long-lasting nail polishes',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1506668635220-3c52de4f07fe?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'Glamour',
    seller: { id: 'c2', name: 'Makeup Studio', rating: 4.8 }
  },
  {
    id: 'c8',
    name: 'Face Serum',
    slug: 'face-serum',
    description: 'Anti-aging vitamin C serum',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'PureGlow',
    seller: { id: 'c1', name: 'Beauty Essentials', rating: 4.9 }
  },
  {
    id: 'c9',
    name: 'Makeup Brushes',
    slug: 'makeup-brushes',
    description: '12-piece professional makeup brush set',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'Glamour',
    seller: { id: 'c2', name: 'Makeup Studio', rating: 4.8 }
  },
  {
    id: 'c10',
    name: 'Sheet Mask Set',
    slug: 'sheet-mask-set',
    description: 'Set of 5 hydrating sheet masks',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80',
    category: 'cosmetics',
    brand: 'PureGlow',
    seller: { id: 'c1', name: 'Beauty Essentials', rating: 4.9 }
  },

  // Fashion
  {
    id: 'fa1',
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description: 'Classic blue denim jacket',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'UrbanStyle',
    seller: { id: 'fa1', name: 'Fashion Hub', rating: 4.7 }
  },
  {
    id: 'fa2',
    name: 'Summer Dress',
    slug: 'summer-dress',
    description: 'Floral print midi summer dress',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'Elegance',
    seller: { id: 'fa2', name: 'Dress Studio', rating: 4.8 }
  },
  {
    id: 'fa3',
    name: 'Sneakers',
    slug: 'sneakers',
    description: 'Comfortable casual sneakers',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'SportStyle',
    seller: { id: 'fa3', name: 'Shoe Haven', rating: 4.9 }
  },
  {
    id: 'fa4',
    name: 'Leather Bag',
    slug: 'leather-bag',
    description: 'Genuine leather shoulder bag',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'Elegance',
    seller: { id: 'fa2', name: 'Dress Studio', rating: 4.8 }
  },
  {
    id: 'fa5',
    name: 'Sunglasses',
    slug: 'sunglasses',
    description: 'UV protection aviator sunglasses',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'UrbanStyle',
    seller: { id: 'fa1', name: 'Fashion Hub', rating: 4.7 }
  },
  {
    id: 'fa6',
    name: 'Watch',
    slug: 'watch',
    description: 'Classic analog watch with leather strap',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'Elegance',
    seller: { id: 'fa2', name: 'Dress Studio', rating: 4.8 }
  },
  {
    id: 'fa7',
    name: 'Winter Coat',
    slug: 'winter-coat',
    description: 'Warm winter coat with fur hood',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'UrbanStyle',
    seller: { id: 'fa1', name: 'Fashion Hub', rating: 4.7 }
  },
  {
    id: 'fa8',
    name: 'Wool Scarf',
    slug: 'wool-scarf',
    description: 'Soft merino wool scarf',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1601924921557-45e6dea0a157?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'Elegance',
    seller: { id: 'fa2', name: 'Dress Studio', rating: 4.8 }
  },
  {
    id: 'fa9',
    name: 'Ankle Boots',
    slug: 'ankle-boots',
    description: 'Leather ankle boots with side zip',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'SportStyle',
    seller: { id: 'fa3', name: 'Shoe Haven', rating: 4.9 }
  },
  {
    id: 'fa10',
    name: 'Leather Belt',
    slug: 'leather-belt',
    description: 'Genuine leather belt with classic buckle',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?auto=format&fit=crop&w=800&q=80',
    category: 'fashion',
    brand: 'UrbanStyle',
    seller: { id: 'fa1', name: 'Fashion Hub', rating: 4.7 }
  },

  // Books
  {
    id: 'b1',
    name: 'The Midnight Library',
    slug: 'midnight-library',
    description: 'A novel about life, death, and the in-between',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Penguin',
    seller: { id: 'b1', name: 'Book Haven', rating: 4.9 }
  },
  {
    id: 'b2',
    name: 'Project Management',
    slug: 'project-management',
    description: 'Complete guide to project management',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Wiley',
    seller: { id: 'b2', name: 'Academic Books', rating: 4.8 }
  },
  {
    id: 'b3',
    name: 'Cooking Basics',
    slug: 'cooking-basics',
    description: 'Essential cookbook for beginners',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Harper',
    seller: { id: 'b3', name: 'Culinary Books', rating: 4.7 }
  },
  {
    id: 'b4',
    name: 'Science Fiction Collection',
    slug: 'sci-fi-collection',
    description: 'Collection of classic sci-fi stories',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Penguin',
    seller: { id: 'b1', name: 'Book Haven', rating: 4.9 }
  },
  {
    id: 'b5',
    name: 'Poetry Anthology',
    slug: 'poetry-anthology',
    description: 'Modern poetry collection',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Oxford',
    seller: { id: 'b4', name: 'Literary Corner', rating: 4.8 }
  },
  {
    id: 'b6',
    name: 'History of Art',
    slug: 'history-of-art',
    description: 'Comprehensive art history book',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Thames',
    seller: { id: 'b5', name: 'Art Books', rating: 4.9 }
  },
  {
    id: 'b7',
    name: 'Financial Planning',
    slug: 'financial-planning',
    description: 'Guide to personal finance',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Wiley',
    seller: { id: 'b2', name: 'Academic Books', rating: 4.8 }
  },
  {
    id: 'b8',
    name: 'Travel Guide',
    slug: 'travel-guide',
    description: 'Comprehensive world travel guide',
    price: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1583396060233-3d13dbadf242?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Lonely Planet',
    seller: { id: 'b6', name: 'Travel Books', rating: 4.7 }
  },
  {
    id: 'b9',
    name: 'Fitness Guide',
    slug: 'fitness-guide',
    description: 'Complete guide to fitness and nutrition',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Harper',
    seller: { id: 'b7', name: 'Health Books', rating: 4.8 }
  },
  {
    id: 'b10',
    name: 'Photography Manual',
    slug: 'photography-manual',
    description: 'Digital photography techniques guide',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    category: 'books',
    brand: 'Thames',
    seller: { id: 'b5', name: 'Art Books', rating: 4.9 }
  }
];

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    return matchesCategory && matchesSearch && matchesBrand;
  });

  const uniqueBrands = [...new Set(SAMPLE_PRODUCTS.map(p => p.brand))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products, brands, or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
       {/* About Section */}
       <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Vendure Storefront</h2>
        <p className="text-gray-700 text-lg">
          Vendure is a headless commerce framework designed for creating modern e-commerce applications. 
          It provides a powerful API and a rich set of features to help you build scalable and customizable 
          storefronts. Our storefront is designed to provide an intuitive shopping experience with a wide 
          range of products across various categories.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-2 block">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}