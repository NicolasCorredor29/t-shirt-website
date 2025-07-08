import Image from "next/image";
import Link from "next/link";

export const Tarjeta = ({ producto }: { producto: any }) => {
  return (
    <div className="flex flex-wrap justify-center items-start gap-3 w-44">
      <Link key={producto.id} href={`/[tshirtid]?id=${producto.id}`}>
        <div className="flex flex-col bg-[#C6D3DB] w-44 h-76 pb-3 gap-3 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
          <Image
            className="bg-white w-44 h-58.5"
            src={producto.image_url}
            alt={producto.title}
            width={176}
            height={234}
          />
          <div>
            <p className="text-[16px]">{producto.title}</p>
            <p className="text-[12px] text-[#994D52]">{producto.artist_name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
