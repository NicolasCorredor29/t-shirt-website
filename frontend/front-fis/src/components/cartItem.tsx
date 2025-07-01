"use client";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image?: string;
  };
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;

  
}

export default function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
      const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image || "https://via.placeholder.com/100"}
          alt={item.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-500">Size: {item.size}</p>
          <p className="text-gray-500">Color: {item.color}</p>
        <div className="flex items-center gap-2 mt-2">
            <button onClick={handleDecrement} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">−</button>
            <span>{item.quantity}</span>
            <button onClick={handleIncrement} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-lg">${item.price}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
      </div>
    </div>
  );
}