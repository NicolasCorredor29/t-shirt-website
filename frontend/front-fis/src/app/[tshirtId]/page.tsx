"use client";

import { useState } from "react";

interface ProductPageProps {
  params: { id: string };
}

const mockProduct = {
  id: 2,
  name: "Camiseta  Dragón Azul",
  description: "Diseño exclusivo de dragón oriental con tinta azul.",
  artist: "Lina Moreno",
  sizes: ["S", "M", "L", "XL"],
  colors: ["black", "white", "blue"],
  image: "/img/camiseta.png",
  price: 99999,
};

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");

  const addToCart = () => {
    // Lógica para agregar al carrito (puede ser contexto, localStorage, etc)
    console.log("Agregado al carrito:", {
      ...mockProduct,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    alert("Producto agregado al carrito 🛒");
  };

  return (
    <main className="bg-[#F1F2F3] min-h-screen flex justify-center py-10 px-6 text-black">
      <div className="flex flex-col md:flex-row bg-white p-6 rounded shadow-lg max-w-5xl w-full gap-8">
        <div className="flex-1">
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
            <p className="text-sm text-gray-600 mb-4">{mockProduct.artist}</p>
            <p className="text-gray-700 mb-4">{mockProduct.description}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Talla</label>
              <div className="flex gap-2">
                {mockProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex gap-2">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="mt-6 w-full bg-black text-white py-3 font-semibold rounded hover:bg-gray-800"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}
