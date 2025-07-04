"use client";

import { useState } from "react";
import CartItem from "@/components/cartItem";

const mockCart = [
  {
    id: 1,
    name: "Camisa1",
    size: "M",
    color: "White",
    quantity: 1,
    price: 99999,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Camisa1",
    size: "M",
    color: "White",
    quantity: 1,
    price: 99999,
    image: "https://via.placeholder.com/100",
  },
    {
    id: 3,
    name: "Camisa1",
    size: "M",
    color: "White",
    quantity: 1,
    price: 99999,
    image: "https://via.placeholder.com/100",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCart);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
                  onRemove={removeItem}
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

              <button
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 text-white font-semibold rounded ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                Continue to checkout
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
