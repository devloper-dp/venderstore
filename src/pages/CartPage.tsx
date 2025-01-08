import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react';
import { cartStorage } from '../lib/cart';
import { processPayment } from '../lib/payment';

export function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState(() => cartStorage.getCart());
  const [isProcessing, setIsProcessing] = React.useState(false);

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    const availableStock = 10; // Assume a fixed stock for validation
    if (quantity > availableStock) {
      alert(`Cannot exceed available stock of ${availableStock}.`);
      return;
    }
    const updatedCart = cartStorage.updateQuantity(itemId, quantity);
    setCart(updatedCart);
    alert(`Quantity updated to ${quantity}.`); // User feedback
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartStorage.removeItem(itemId);
    setCart(updatedCart);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const result = await processPayment(cart.total);
      if (result.success) {
        // Clear cart after successful payment
        cartStorage.clearCart();
        setCart(cartStorage.getCart());
        // Show success message and redirect
        alert('Payment successful! Order confirmed.');
        navigate('/');
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart.items.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border-b last:border-b-0"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">Rs{item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                      disabled={isProcessing}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                      disabled={isProcessing}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                    disabled={isProcessing}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs{cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs{cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard size={20} />
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}