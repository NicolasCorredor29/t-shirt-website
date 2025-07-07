import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addToCart: (newItem) =>
    set((state) => {
      const existing = state.cartItems.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, newItem],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));