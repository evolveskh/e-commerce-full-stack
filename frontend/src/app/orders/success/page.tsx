import Link from "next/link";

export default function OrderSucessPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Order Placed!</h1>
        <p className="text-gray-500">Thanks you for your purchase.</p>
        <Link href="/" className="text-sm underline inline-block">
          Continue shoppping
        </Link>
      </div>
    </div>
  );
}
