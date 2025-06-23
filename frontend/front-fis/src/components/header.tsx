"use client";
import { Search, Shirt, User, ShoppingBag } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useState } from "react";

export const Header: React.FC = () => {
  const [mostrarBarra, setMostrarBarra] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const manejarClick = () => {
    setMostrarBarra(!mostrarBarra);
  };

  return (
    <header className="bg-[#E5E8EB] flex justify-between w-full h-19 border-b-1 pt-3 pr-10 pb-3 pl-10">
      <section className="flex justify-center w-100 h-full gap-4 items-center">
        <Shirt />
        <p className="text-2xl">t-shirt Store</p>
      </section>
      <section className="flex justify-end w-full h-full gap-8 ">
        <article className="flex justify-around items-center w-110 h-full">
          <Link
            href="#link"
            className="flex flex-col justify-center w-15 h-6 rounded-3xl transition-all duration-300 hover:bg-[#E398C9]"
          >
            <button>Men</button>
          </Link>
          <Link
            href="/login"
            className=" flex flex-col justify-center w-20 h-6 rounded-3xl transition-all duration-300 hover:bg-[#E398C9]"
          >
            <button>Women</button>
          </Link>
          <Link
            href="#link"
            className=" flex flex-col justify-center w-17 h-6 rounded-3xl transition-all duration-300 hover:bg-[#E398C9]"
          >
            <button>Kids</button>
          </Link>
          <Link
            href="#link"
            className=" flex flex-col justify-center w-17 h-6 rounded-3xl transition-all duration-300 hover:bg-[#E398C9]"
          >
            <button>Sale</button>
          </Link>
        </article>
        <article className="flex justify-between items-center w-35 h-full mr-10">
          <div>
            <button
              onClick={manejarClick}
              className="bg-[#F2E8E8] w-10 h-10 rounded-[8px] pr-2.5 pl-2.5 transform transition duration-300 hover:scale-105"
            >
              {mostrarBarra ? "X" : <Search />}
            </button>
            {mostrarBarra && (
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar..."
                className="border p-2 ml-2"
              />
            )}
          </div>
          <div>
            <Link href="/login">
              <button className="bg-[#F2E8E8] w-10 h-10 rounded-[8px] pr-2.5 pl-2.5 transform transition duration-300 hover:scale-105">
                <User />
              </button>
            </Link>
          </div>
          <div>
            <button className="bg-[#F2E8E8] w-10 h-10 rounded-[8px] pr-2.5 pl-2.5 transform transition duration-300 hover:scale-105">
              {" "}
              <ShoppingBag />
            </button>
          </div>
        </article>
      </section>
    </header>
  );
};
