import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // o cualquier ícono que uses

export const CartIcon = ({ count }: { count: number }) => {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-black" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};