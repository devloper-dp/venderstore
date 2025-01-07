import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { cartStorage } from '../lib/cart';

// Find product from SAMPLE_PRODUCTS
const SAMPLE_PRODUCTS = [
  // ... your existing products array
];

export function ProductPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = React.useState(1);

  const product = SAMPLE_PRODUCTS.find(p => p.slug === slug);

  const addToCart = () => {
    if (product) {
      cartStorage.addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl
      });
      navigate('/cart');
    }
  };

  if (!product) {
    return <div className="flex justify-center p-8">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}