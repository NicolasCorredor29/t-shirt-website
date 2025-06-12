import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center w-320 h-50 bg-[#FCF7F7]">
      <section className="flex flex-col w-240 h-50 max-w-240 pt-10 pr-5 pb-10 pl-5 gap-6">
        <article className="flex w-230 h-18 gap-7.5 bg-[#FFFFFF]">
          <Link href="#">
            <button className="w-40 h-6 min-w-40 text-[#994D52] mt-6 transition-all duration-300 hover:bg-amber-300 rounded-md">
              Nosotros
            </button>
          </Link>
          <Link href="#">
            <button className="w-40 h-6 min-w-40 text-[#994D52] mt-6 transition-all duration-300 hover:bg-amber-300 rounded-md">
              Contacto
            </button>
          </Link>
          <Link href="#">
            <button className="w-40 h-6 min-w-40 text-[#994D52] mt-6 transition-all duration-300 hover:bg-amber-300 rounded-md">
              FAQ
            </button>
          </Link>
          <Link href="#">
            <button className="w-40 h-6 min-w-40 text-[#994D52] mt-6 transition-all duration-300 hover:bg-amber-300 rounded-md">
              menu principal
            </button>
          </Link>
          <Link href="#">
            <button className="w-40 h-6 min-w-40 text-[#994D52] mt-6 transition-all duration-300 hover:bg-amber-300 rounded-md">
              ayuda
            </button>
          </Link>
        </article>
        <article className="flex flex-col justify-center items-center w-230 h-6 ">
          <div className="flex gap-4">
            <p>icono 1</p>
            <p>icono 2</p>
            <p>icono 3</p>
          </div>
          <div className="text-[#994D52]">
            <p>@2025t-shirts.All righta reserved</p>
          </div>
        </article>
      </section>
    </footer>
  );
}
