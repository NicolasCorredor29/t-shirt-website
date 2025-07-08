"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";


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
 const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSleeve, setSelectedSleeve] = useState("")
  const userId = useUserStore((state) => state.userId);

    const handleSelect = (value: string) => {
    setSelectedSleeve(value);
    console.log("Seleccionado:", value); // Puedes quitar esto luego
  };


  const handleAddToCart = () => {
    const item = {
      id: mockProduct.id, // id del producto real
      name: mockProduct.name,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      price: mockProduct.price,
      image: mockProduct.image,
      
    };
    console.log("Producto a agregar:", item);
    if (userId) {
      addToCart(userId, item);
    } else {
      console.warn("No se encontró el userId en localStorage");
    }
    
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
            <div className="text-xl font-semibold text-blue-600">
              {mockProduct.price} COP
            </div>

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
                      <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Tipo</p>
            <div className="flex gap-4">
              <button className="flex flex-col items-center gap-1 text-sm hover:text-blue-600">
                <img
                  src="/img/mangacorta.png"
                  className="w-8 h-8"
                  alt="Sleveless"
                />
                Sleveless
              </button>
              <button className="flex flex-col items-center gap-1 text-sm hover:text-blue-600">
                <img
                  src="/img/mangalarga.png"
                  className="w-8 h-8"
                  alt="Long sleeves"
                />
                Long sleeves
              </button>
              <button className="flex flex-col items-center gap-1 text-sm hover:text-blue-600">
                <img
                  src="/img/normal.png"
                  className="w-8 h-8"
                  alt="T-shirt"
                />
                T-shirt
              </button>
            </div>
          </div>
          </div>


          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-black text-white py-3 font-semibold rounded hover:bg-gray-800"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}
