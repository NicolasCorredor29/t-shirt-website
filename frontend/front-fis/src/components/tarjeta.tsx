import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "dragon-azul",
    name: "Camisa 1",
    artist: "Lina Moreno",
    image: "",
  },
  {
    id: "luna-roja",
    name: "Camisa 2",
    artist: "Mateo Torres",
    image: "",
  },
  {
    id: "cara-bola",
    name: "Camisa 3",
    artist: "Mateo Torres",
    image: "",
  },
  {
    id: "lulu-jaja",
    name: "Camisa 4",
    artist: "Mateo Torres",
    image: "",
  },
  {
    id: "j-pablo",
    name: "Camisa 5",
    artist: "Mateo Torres",
    image: "",
  },
  {
    id: "cami-res",
    name: "Camisa 6",
    artist: "Mateo Torres",
    image: "",
  },
  {
    id: "seb-cast",
    name: "Camisa 7",
    artist: "Mateo Torres",
    image: "",
  },
];

export const Tarjeta = () => {
  return (
    <div className="flex flex-wrap justify-center items-start gap-3 w-full">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`}>
          <div className="flex flex-col bg-[#C6D3DB] w-44 h-76 pb-3 gap-3 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
            <Image
              className="bg-white w-44 h-58.5"
              src={product.image}
              alt={product.name}
              width={176}
              height={234}
            />
            <div>
              <p className="text-[16px]">{product.name}</p>
              <p className="text-[12px] text-[#994D52]">{product.artist}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
