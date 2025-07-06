"use client";
import { useState } from "react";
import { Tarjeta } from "@/components/tarjeta";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="bg-[#F1F2F3] w-full flex justify-center min-h-screen pt-5 pr-40 pb-5 pl-40 text-black overflow-y-auto">
        <section className=" flex flex-col w-350 h-190 max-w-350">
          <article>
            <p className="text-4xl">Titulo</p>
          </article>
          <article className="flex w-full h-14 pt-3 pr-4 pb-3 pl-3 gap-3">
            <div className="bg-[#F2E8E8] flex justify-center w-15 h-8 rounded-[8px] pr-4 pl-4 gap-2">
              <button>All</button>
            </div>
            <div className="bg-[#F2E8E8] flex justify-center w-15 h-8 rounded-[8px] pr-4 pl-4 gap-2">
              <button>Men</button>
            </div>
            <div className="bg-[#F2E8E8] flex justify-center w-24 h-8 rounded-[8px] pr-4 pl-4 gap-2">
              <button>Women</button>
            </div>
            <div className="bg-[#F2E8E8] flex justify-center w-24 h-8 rounded-[8px] pr-4 pl-4 gap-2">
              <button>Kids</button>
            </div>
            <Link href="/formulario">
              <button>Agregar Producto</button>
            </Link>
          </article>
          <article className="w-full min-h-165 p-4 gap-3">
            <Tarjeta />
          </article>
        </section>
      </main>
    </div>
  );
}
