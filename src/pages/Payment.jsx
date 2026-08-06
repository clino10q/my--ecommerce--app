import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconArrowNarrowLeft,
  IconCreditCard,
  IconLock,
  IconCircleCheck,
} from "@tabler/icons-react";

export default function Payment({ cart, page, setCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [paidTotal, setPaidTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  // Match cart entries against the full product list to get price
  const cartItems = Object.entries(cart)
    .map(([id, entry]) => {
      const product = page.find((p) => p.id === Number(id));
      return product
        ? {
            ...product,
            quantity: entry.quantity,
            color: entry.color,
            size: entry.size,
          }
        : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);

    // Simulated payment processing — replace with real API call later
    setTimeout(() => {
      const newOrderNumber = `UNI-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder = {
        orderNumber: newOrderNumber,
        date: new Date().toISOString(),
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        total,
        step: 0,
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([newOrder, ...existingOrders]),
      );

      setOrderNumber(newOrderNumber);
      setPaidTotal(total);
      setIsProcessing(false);
      setIsConfirmed(true);
      setCart({}); // clear the cart after successful "payment"
    }, 1200);
  }

  // Confirmation screen
  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <IconCircleCheck
          size={64}
          className="text-emerald-600 dark:text-emerald-400 mb-4"
        />
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
          Order Confirmed!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Thanks for your purchase. Your order has been placed successfully.
        </p>
        <p className="text-sm font-bold text-black dark:text-white mb-6">
          Order #{orderNumber}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Total paid:{" "}
          <span className="font-bold text-black dark:text-white">
            ${paidTotal.toFixed(2)}
          </span>
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-md bg-emerald-600 text-white font-bold
                     hover:bg-emerald-700 transition-colors"
        >
          Back to Shopping
        </Link>
      </div>
    );
  }

  // Empty cart guard — shouldn't normally land here, but just in case
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-black dark:text-white mb-4">Your cart is empty.</p>
        <Link
          to="/shop"
          className="px-6 py-2 rounded-md bg-emerald-600 text-white font-bold
                     hover:bg-emerald-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/checkout")}
          className="inline-flex items-center gap-1 mb-6 text-black dark:text-white
                     hover:text-emerald-500 hover:underline transition-colors cursor-pointer"
        >
          <IconArrowNarrowLeft stroke={1} />
          Back to Cart
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">
          Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-md bg-white dark:bg-neutral-900
                         border border-gray-200 dark:border-neutral-800 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <IconLock size={16} />
                Your payment info is encrypted and secure
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Cardholder Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full mt-1 px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                             bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-emerald-400
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Card Number
                </label>
                <div className="relative mt-1">
                  <IconCreditCard
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    required
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                               bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-emerald-400
                               placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400">
                    Expiry Date
                  </label>
                  <input
                    required
                    value={formData.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                               bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-emerald-400
                               placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400">
                    CVV
                  </label>
                  <input
                    required
                    value={formData.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                               bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-emerald-400
                               placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 px-6 py-3 rounded-md bg-emerald-600 text-white font-bold
                           hover:bg-emerald-700 transition-colors cursor-pointer
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="p-6 rounded-md bg-white dark:bg-neutral-900
                             border border-gray-200 dark:border-neutral-800 lg:sticky lg:top-10"
            >
              <h3 className="font-bold text-black dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-black dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                          {item.size && <> · Size: {item.size}</>}
                        </p>
                        {item.color && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                            style={{ background: item.color }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-black dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-sm border-t border-gray-200 dark:border-neutral-800 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-neutral-800 my-2"></div>
                <div className="flex justify-between font-bold text-black dark:text-white text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
