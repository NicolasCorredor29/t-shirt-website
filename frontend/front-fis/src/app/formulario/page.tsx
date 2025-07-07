// app/formulario/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
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

        <Label>Title</Label>
        <Input
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Dragon rojo"
        />
        <Label>Description</Label>
        <Input
          name="description"
          value={formData.name}
          onChange={handleChange}
          placeholder="Un dragon rojo en una montaña"
        />
        <Label>Category</Label>
        <Input
          name="category"
          value={formData.artist}
          onChange={handleChange}
          placeholder="All"
        />
        <Label>Image</Label>
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de imagen"
        />

        <Button type="submit">Save and return</Button>
      </form>
    </main>
  );
}
