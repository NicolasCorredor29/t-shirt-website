"use client";

import { useEffect } from "react";
import CartItem from "@/components/cartItem";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const rawUpdateQuantity = useCartStore((state) => state.updateQuantity);
  const loadCart = useCartStore((state) => state.loadCart);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    console.log("iduser"+userId);
    if (userId) {
      loadCart(userId);
    } else {
      console.warn("No se encontró el userId en localStorage");
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleRemoveItem = (tshirtId: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No se encontró userId");
      return;
    }
    removeItem(userId, tshirtId);
  };

  const handleQuantityChange = (tshirtId: number, newQuantity: number) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No se encontró userId");
      return;
    }
    rawUpdateQuantity(userId, tshirtId, newQuantity);
  };

  return (
    <div>
      <main className="bg-[#F1F2F3] w-full flex justify-center min-h-screen pt-5 pr-40 pb-5 pl-40 text-black overflow-y-auto">
        <section className=" flex flex-col w-350 h-190 max-w-350">
          <article className="mb-5">
            <p className="text-4xl">My Cart</p>
          </article>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2 bg-white p-6 rounded shadow">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <div className="bg-white p-6 rounded shadow flex flex-col justify-between min-h-[300px]">
              <div>
                <h2 className="text-xl font-semibold mb-4">Orden summary</h2>
                <p className="text-lg">
                  Total: <span className="font-bold">${total}</span>
                </p>
              </div>

              <Button
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 text-white font-semibold rounded ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                Continue to checkout
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
