"use client";

import api from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const { items } = useCart();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return isLoggedIn();
  });
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/login");
  };

  const filtered = products.filter((p) =>
    p.name.toLocaleLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div className="p-8 text-gray-900">Loading....</div>;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Shop</h1>
        <Link href="/cart" className="text-sm underline">
          Cart ({items.length})
        </Link>
        {loggedIn ? (
          <>
            <Link href="/orders" className="text-sm underline">
              Orders
            </Link>
            <Link href="/products/create" className="text-sm underline">
              Add Product
            </Link>
            <button onClick={handleLogout} className="text-sm underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm underline">
            Login
          </Link>
        )}
      </header>
      <main className="p-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border rounded px-4 py-2 text-sm"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No product yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-bold mt-2">{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
