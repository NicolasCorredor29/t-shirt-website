import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};
/*type CartItem = {
  id: number;
  cart_id: number;
  desing_id: number;
  item_id: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};*/

type CartStore = {
  cartItems: CartItem[];
  loadCart: (userId: number) => Promise<void>;
  addToCart: (userId: number, item: CartItem) => Promise<void>;
  updateQuantity: (
    userId: number,
    tshirtId: number,
    newQuantity: number
  ) => Promise<void>;
  removeFromCart: (userId: number, tshirtId: number) => Promise<void>;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  createCart: async (userId: number) => {
  try {
    const res = await fetch(`http://localhost:4000/createShoppingCart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!res.ok) {
      throw new Error("Failed to create shopping cart");
    }

    console.log("Carrito creado correctamente");
  } catch (err) {
    console.error("Error al crear el carrito:", err);
  }
},

  
  loadCart: async (userId: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/shoppingCart/${userId}`
      );
      if (res.status==404){
        set({ cartItems: [] });
        return;
      }
      if (!res.ok) {
        console.error("Failed to fetch cart", await res.text());
        return;
      }

      const data = await res.json();
      set({ cartItems: data });
      console.log(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  },

  addToCart: async (userId, tshirtId) => {
    try {
      await fetch(`http://localhost:4000/addtoCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          tshirt_id: tshirtId,
          quantity: 1,
        }),
      });
      console.log("Se agregó con exito")

      await get().loadCart(userId);
    } catch (err) {
      console.log(userId, tshirtId);
      console.error("Error adding to cart:", err);
    }
  },

  removeFromCart: async (userId, tshirtId) => {
    try {
      await fetch(`http://localhost:4000/deletetoCart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          tshirt_id: tshirtId,
        }),
      });

      await get().loadCart(userId);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  },

  updateQuantity: async (
    userId: number,
    tshirtId: number,
    newQuantity: number
  ) => {
    try {
      
      await fetch("http://localhost:4000/updatetoCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          tshirt_id: tshirtId,
          quantity: newQuantity,
        }),
      });

      // Y luego actualizar localmente el estado
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === tshirtId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  },
  clearCart: () => set({ cartItems: [] }),
}));
