import { Star, Tag, TrendingUp, Clock } from 'lucide-react';

//   Sample product data for ProductCommandSearch component
export const products = [
    { id: 1, name: 'Wireless Bluetooth Headphones', price: '$89.99', category: 'Electronics', rating: 4.8, inStock: true },
    { id: 2, name: 'Premium Coffee Beans', price: '$24.99', category: 'Food & Beverages', rating: 4.9, inStock: true },
    { id: 3, name: 'Ergonomic Office Chair', price: '$299.99', category: 'Furniture', rating: 4.7, inStock: false },
    { id: 4, name: 'Smartphone Case', price: '$19.99', category: 'Accessories', rating: 4.5, inStock: true },
    { id: 5, name: 'Yoga Mat', price: '$34.99', category: 'Sports & Fitness', rating: 4.6, inStock: true },
    { id: 6, name: 'LED Desk Lamp', price: '$45.99', category: 'Home & Garden', rating: 4.4, inStock: true },
    { id: 7, name: 'Organic Skincare Set', price: '$79.99', category: 'Beauty', rating: 4.8, inStock: true },
    { id: 8, name: 'Mechanical Keyboard', price: '$129.99', category: 'Electronics', rating: 4.9, inStock: true },
  ];

// quickActions for ProductCommandSearch component
  export  const quickActions = [
    { icon: TrendingUp, label: 'Trending Products', action: 'trending' },
    { icon: Tag, label: 'Sale Items', action: 'sale' },
    { icon: Clock, label: 'Recently Viewed', action: 'recent' },
    { icon: Star, label: 'Top Rated', action: 'top-rated' },
  ];