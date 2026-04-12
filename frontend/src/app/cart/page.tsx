"use client";

import { useCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b px-8 py-4">
          <Link href="/" className="text-sm underline">
            Back to products
          </Link>
        </header>

        <main className="p-8 text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/" className="text-sm underline mt-4 inline-block">
            Continue shopping
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b px-8 flex justify-between items-center">
        <Link href="/" className="text-sm underline">
          Back to products
        </Link>
        <button onClick={clearCart} className="text-sm text-red-500 underline">
          Clear cart
        </button>
      </header>
      <main className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500 underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium mt-4">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
