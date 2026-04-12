"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-gray-900">Loading....</div>;
  if (!product)
    return <div className="p-8 text-gray-900">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b px-8 py-4">
        <Link href="/" className="text-sm underline">
          Back to products
        </Link>
      </header>

      <main className="p-8 max-w-2xl mx-auto">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={500}
            className="w-full h-80 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        <div className="mt-6 space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )}
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{product.stock} in stock</p>
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              })
            }
            className="w-full bg-black text-white py-3 rounded-lg font-medium"
          >
            Add to Card
          </button>
        </div>
      </main>
    </div>
  );
}
