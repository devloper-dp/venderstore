export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const CART_KEY = 'shopping_cart';

export const cartStorage = {
  getCart: (): Cart => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
  },

  saveCart: (cart: Cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addItem: (item: Omit<CartItem, 'id'>) => {
    const cart = cartStorage.getCart();
    const existingItem = cart.items.find(i => i.productId === item.productId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({
        ...item,
        id: Math.random().toString(36).substr(2, 9)
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartStorage.saveCart(cart);
    return cart;
  },

  updateQuantity: (itemId: string, quantity: number) => {
    const cart = cartStorage.getCart();
    const item = cart.items.find(i => i.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartStorage.saveCart(cart);
    }
    
    return cart;
  },

  removeItem: (itemId: string) => {
    const cart = cartStorage.getCart();
    cart.items = cart.items.filter(i => i.id !== itemId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartStorage.saveCart(cart);
    return cart;
  },

  clearCart: () => {
    const emptyCart = { items: [], total: 0 };
    cartStorage.saveCart(emptyCart);
    return emptyCart;
  }
};