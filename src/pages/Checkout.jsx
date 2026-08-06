import { Link, useNavigate } from "react-router-dom";
import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconArrowNarrowLeft,
  IconShoppingCartOff,
} from "@tabler/icons-react";

export default function Checkout({
  cart,
  page,
  increment,
  decrement,
  removeFromCart,
}) {
  const navigate = useNavigate();

  // Match cart entries against the full product list to get title/price/image
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <IconShoppingCartOff
          size={48}
          className="text-gray-300 dark:text-neutral-700 mb-4"
        />
        <h2 className="text-xl font-bold text-black dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Looks like you haven't added anything yet.
        </p>
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
      <div className="max-w-5xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 mb-6 text-black dark:text-white
                     hover:text-emerald-500 hover:underline transition-colors"
        >
          <IconArrowNarrowLeft stroke={1} />
          Continue Shopping
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-md
                           bg-white dark:bg-neutral-900
                           border border-gray-200 dark:border-neutral-800"
              >
                {/* Row 1: image + title/price — always shown together */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-black dark:text-white line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      ${item.price.toFixed(2)} each
                    </p>
                    {(item.color || item.size) && (
                      <span className="flex items-center gap-2 mt-1">
                        {item.color && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                              style={{ background: item.color }}
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Color
                            </span>
                          </span>
                        )}
                        {item.size && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Size:{" "}
                            <span className="font-medium text-black dark:text-white">
                              {item.size}
                            </span>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2 on mobile / same row on desktop: stepper, line total, delete */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <div className="flex items-center rounded-md bg-emerald-800 text-white overflow-hidden">
                    <button
                      onClick={() => decrement(item.id)}
                      className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <IconMinus size={14} />
                    </button>
                    <span className="px-2 text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <IconPlus size={14} />
                    </button>
                  </div>

                  <p className="w-16 sm:w-20 text-right font-bold text-black dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
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

              <div className="flex flex-col gap-2 text-sm">
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

              <button
                onClick={() => navigate("/payment")}
                className="w-full mt-6 px-6 py-3 rounded-md bg-emerald-600 text-white
                           font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
