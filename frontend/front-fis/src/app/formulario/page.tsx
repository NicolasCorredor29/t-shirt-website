// app/formulario/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormularioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    artist: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí puedes guardar en una API o localStorage (opcional)
    console.log("Producto guardado:", formData);

    // Redirige de vuelta a la página principal
    router.push("/");
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#F1F2F3]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-5 bg-white rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-2 text-black">Agregar Producto</h2>

        <input
          className="border p-2 text-black"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="ID"
        />
        <input
          className="border p-2 text-black"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          className="border p-2 text-black"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artista"
        />
        <input
          className="border p-2 text-black"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de imagen"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Guardar y volver
        </button>
      </form>
    </main>
  );
}
