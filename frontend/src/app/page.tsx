"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  });
  if (loading) return <div className="p-8 text-gray-900">Loading....</div>;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Shop</h1>
        <Link href="/login" className="text-sm underline">
          Login
        </Link>
      </header>
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No product yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-col2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div></div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
