"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

const materialBasePrices: Record<string, number> = {
  algodon: 30000,
  lino: 50000,
  seda: 70000,
};

const sizeMultipliers: Record<string, number> = {
  S: 1,
  M: 1.2,
  L: 1.5,
  XL: 2,
};

export default function ProductPage({ params }: ProductPageProps) {
  const searchParams = useSearchParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const id_design = searchParams.get("id");

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const userId = useUserStore((state) => state.userId);
  const [selectedSleeve, setSelectedSleeve] = useState("tshirt");
  const [selectedMaterial, setSelectedMaterial] = useState("algodon");

  const loadUserId = useUserStore((state) => state.loadUserId);

  useEffect(() => {
    loadUserId();
  }, []);

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    artist: "",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white", "blue"],
    image: "",
    price: 0,
  });

  const calculatePrice = (material: string, size: string) => {
    const base = materialBasePrices[material] || 0;
    const multiplier = sizeMultipliers[size] || 1;
    return Math.round(base * multiplier);
  };

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:4000/oneDesign/${id_design}`);
        const data = await res.json();
        const diseño = data[0];

        setProduct({
          id: Number(id_design),
          name: diseño.title,
          artist: diseño.artist_name,
          description: diseño.description,
          image: diseño.image_url || "/img/camiseta.png",
          price: calculatePrice(selectedMaterial, selectedSize),
          sizes: ["S", "M", "L", "XL"],
          colors: ["black", "white", "blue"],
        });
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    if (id_design) fetchProducto();
  }, [id_design]);

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      price: calculatePrice(selectedMaterial, selectedSize),
    }));
  }, [selectedMaterial, selectedSize]);

  const handleAddToCart = async () => {
    const item = {
      id: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      material: selectedMaterial,
      quantity: 1,
      price: product.price,
      image: product.image,
    };

    const pedido = {
      design_id: product.id,
      size: selectedSize,
      color: selectedColor,
      material: selectedMaterial,
      type: selectedSleeve,
      price: product.price,
    };

    console.log("Producto a agregar:", item);
    console.log(userId);
    let data = null;

    try {
      const res = await fetch("http://localhost:4000/createTshirt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      data = await res.json();

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al enviar el pedido");
      }

      console.log("Pedido enviado correctamente" + data);
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }

    if (userId) {
      console.log(data);
      addToCart(userId, data);
    } else {
      console.warn("No se encontró el userId en localStorage");
    }
  };

  return (
    <main className="bg-[#F1F2F3] min-h-screen flex justify-center py-10 px-6 text-black">
      <div className="flex flex-col md:flex-row bg-white p-6 rounded shadow-lg max-w-5xl w-full gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-4">{product.artist}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="text-xl font-semibold text-blue-600">
              {product.price} COP
            </div>

            {/* Talla */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Talla</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
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

            {/* Color */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
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

            {/* Tipo */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Tipo</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSleeve("sleveless")}
                  className="flex flex-col items-center gap-1 text-sm hover:text-blue-600"
                >
                  <img
                    src="/img/mangacorta.png"
                    className="w-8 h-8"
                    alt="Sleveless"
                  />
                  Sleveless
                </button>
                <button
                  onClick={() => setSelectedSleeve("long")}
                  className="flex flex-col items-center gap-1 text-sm hover:text-blue-600"
                >
                  <img
                    src="/img/mangalarga.png"
                    className="w-8 h-8"
                    alt="Long sleeves"
                  />
                  Long sleeves
                </button>
                <button
                  onClick={() => setSelectedSleeve("tshirt")}
                  className="flex flex-col items-center gap-1 text-sm hover:text-blue-600"
                >
                  <img
                    src="/img/normal.png"
                    className="w-8 h-8"
                    alt="T-shirt"
                  />
                  T-shirt
                </button>
              </div>
            </div>

            {/* Material */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="algodon">Algodón</option>
                <option value="lino">Lino</option>
                <option value="seda">Seda</option>
              </select>
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
