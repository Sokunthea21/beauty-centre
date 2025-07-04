interface QuantityControlProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

export default function QuantityControl({ quantity, onChange }: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(quantity - 1)} disabled={quantity === 1}>−</button>
      <span className="border px-3 py-1">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)}>+</button>
    </div>
  );
}
