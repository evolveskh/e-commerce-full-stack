import Stripe from "stripe";
import { prisma } from "./product.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = async (
  orderId: string,
  items: {
    name: string;
    price: number;
    quantity: number;
  }[],
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    metadata: { orderId },
    success_url: `${process.env.CORS_ORIGIN}/orders/success?orderId=${orderId}`,
    cancel_url: `${process.env.CORS_ORIGIN}/cart`,
  });
  return session.url;
};

export const handleWebhook = async (payload: Buffer, signature: string) => {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
    }
  }
};
