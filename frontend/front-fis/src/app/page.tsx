"use client";
import { useEffect, useState } from "react";
import { Tarjeta } from "@/components/tarjeta";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:4000/designs", {
          method: "GET",
        }); // Ajusta la URL a tu backend real
        const data = await res.json();
        console.log(data[0]);
        setProductos(data); // Guardamos el arreglo recibido
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProductos();
  }, []);
  return (
    <div>
      <main className="bg-[#F1F2F3] w-full flex justify-center min-h-screen pt-5 pr-40 pb-5 pl-40 text-black overflow-y-auto">
        <section className=" flex flex-col w-350 h-190 max-w-350 ">
          <article>
            <p className="text-4xl">Titulo</p>
          </article>
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex space-x-4">
              <button className="bg-[#F2E8E8] px-8 py-2 rounded">All</button>
              <button className="bg-[#F2E8E8] px-8 py-2 rounded">Men</button>
              <button className="bg-[#F2E8E8] px-8 py-2 rounded">Women</button>
              <button className="bg-[#F2E8E8] px-8 py-2 rounded">Kids</button>
            </div>

            <Link href="/formulario">
              <Button>Add Desing</Button>
            </Link>
          </div>

          <article className="flex w-full h-14 pt-3 pr-4 pb-3 pl-3 gap-3"></article>
          <article className="flex flex-wrap flex-row justify-start items-start w-full p-4 gap-3">
            {productos.map((producto: any) => (
              <Tarjeta key={producto.id} producto={producto} />
            ))}
          </article>
        </section>
      </main>
    </div>
  );
}
