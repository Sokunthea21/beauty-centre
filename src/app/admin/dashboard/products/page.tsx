'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Aloe Sun Cream', brand: 'COSRX', price: 7.5, stock: 30 },
  ]);
  const [form, setForm] = useState({ name: '', brand: '', price: '', stock: '' });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name,
      brand: form.brand,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };
    setProducts([...products, newProduct]);
    setForm({ name: '', brand: '', price: '', stock: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Brand"
          className="border p-2 rounded"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>

      <button
        className="bg-black text-white px-4 py-2 rounded mb-6"
        onClick={handleAddProduct}
      >
        Add Product
      </button>

      <table className="w-full text-sm text-left bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2">{prod.id}</td>
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">{prod.brand}</td>
              <td className="px-4 py-2">${prod.price}</td>
              <td className="px-4 py-2">{prod.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
