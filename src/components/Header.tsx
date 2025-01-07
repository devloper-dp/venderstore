import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Store } from 'lucide-react';
import { cartStorage } from '../lib/cart';

export function Header() {
  const [cart, setCart] = React.useState(() => cartStorage.getCart());

  React.useEffect(() => {
    const handleStorageChange = () => {
      setCart(cartStorage.getCart());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCart(cartStorage.getCart());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">VendureStore</span>
          </Link>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6 animate-bounce" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart ({totalItems})</span>
            </Link>
            <button className="sm:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}