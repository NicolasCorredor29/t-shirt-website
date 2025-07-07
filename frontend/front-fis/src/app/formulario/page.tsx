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

  //Aca cambie esto para mandar la camiseta a la base de datos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/jp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al guardar el producto");

      // Opcional: puedes mostrar un mensaje o limpiar el formulario
      console.log("Producto guardado correctamente");

      // Redirige a la página principal
      router.push("/");
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
    }
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
