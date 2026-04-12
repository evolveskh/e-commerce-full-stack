"use client";

import api from "@/lib/api";
import { useCart } from "@/lib/cart";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrder = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/orders", {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      router.push("/orders/success");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response: { data: { error: string } } };
        setError(axiosErr.response.data.error);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center">
        <p className="text-gra500">No items to checkout</p>
        <Link href="/" className="text-sm underline mt-4 inline-block">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 text-center">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <Link href="/cart" className="text-sm underline">
          Back to cart
        </Link>
      </header>

      <main className="p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="bg-white rounded-lg shadow p-4 space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Placing order" : "Place Order"}
          </button>
        </div>
      </main>
    </div>
  );
}
