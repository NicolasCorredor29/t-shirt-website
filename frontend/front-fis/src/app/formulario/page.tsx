// app/formulario/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function FormularioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("id en mi otra interfaz: " + id);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      artist_id: id,
      ...formData,
      // Envia el id recibido por query
    };
    console.log(payload);
    try {
      const res = await fetch("http://localhost:4000/designs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar en la base de datos");

      console.log("Producto guardado con éxito");

      // Redirige después del guardado
      router.push("/");
    } catch (err) {
      console.error("Error al enviar el producto:", err);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#F1F2F3]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-5 bg-white rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-2 text-black">Agregar Producto</h2>

        <Label>Category</Label>
        <Input
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          placeholder="Enter a number"
        />
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Dragon rojo"
        />
        <Label>Description</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Un dragon rojo en una montaña"
        />
        <Label>Image</Label>
        <Input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="URL de imagen"
        />

        <Button type="submit">Save and return</Button>
      </form>
    </main>
  );
}
