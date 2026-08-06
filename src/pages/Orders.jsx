import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowNarrowLeft,
  IconCircleCheck,
  IconPackage,
  IconTruck,
  IconClipboardList,
  IconHome,
} from "@tabler/icons-react";

const STAGES = [
  { label: "Placed", icon: IconClipboardList },
  { label: "Processing", icon: IconPackage },
  { label: "Shipped", icon: IconTruck },
  { label: "Delivered", icon: IconHome },
];

// Demo-only: since there's no real courier API, progress is simulated
// based on how much time has passed since the order was placed.
function getEffectiveStep(order) {
  const minutesElapsed = (Date.now() - new Date(order.date).getTime()) / 60000;
  if (minutesElapsed >= 6) return 3; // Delivered
  if (minutesElapsed >= 3) return 2; // Shipped
  if (minutesElapsed >= 1) return 1; // Processing
  return 0; // Placed
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
        <IconPackage
          size={48}
          className="text-gray-300 dark:text-neutral-700 mb-4"
        />
        <h2 className="text-xl font-bold text-black dark:text-white mb-2">
          No orders yet
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Your order history will show up here once you make a purchase.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2 rounded-md bg-emerald-600 text-white font-bold
                     hover:bg-emerald-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 px-4 sm:px-6 md:px-10 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 mb-6 text-black dark:text-white
                     hover:text-emerald-500 hover:underline transition-colors"
        >
          <IconArrowNarrowLeft stroke={1} />
          Continue Shopping
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">
          My Orders
        </h1>

        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const step = getEffectiveStep(order);
            const isDelivered = step === 3;

            return (
              <div
                key={order.orderNumber}
                className="p-4 sm:p-6 rounded-md bg-white dark:bg-neutral-900
                           border border-gray-200 dark:border-neutral-800"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full
                      ${
                        isDelivered
                          ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400"
                          : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    {isDelivered ? "Delivered" : STAGES[step].label}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {order.items.map((item) => (
                    <div key={item.id} className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        className="w-14 h-14 object-contain
                   border border-gray-100 dark:border-neutral-800 rounded-md p-1"
                      />
                      {item.color && (
                        <span
                          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
                     border-2 border-white dark:border-neutral-900"
                          style={{ background: item.color }}
                          title="Selected color"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress tracker */}
                <div className="flex items-center">
                  {STAGES.map((stage, i) => {
                    const Icon = stage.icon;
                    const isComplete = i < step || isDelivered;
                    const isCurrent = i === step && !isDelivered;

                    return (
                      <div
                        key={stage.label}
                        className="flex items-center flex-1 last:flex-none"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                              transition-colors
                              ${
                                isComplete
                                  ? "bg-emerald-600 text-white"
                                  : isCurrent
                                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500 animate-pulse"
                                    : "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-600"
                              }`}
                          >
                            {isComplete ? (
                              <IconCircleCheck size={16} />
                            ) : (
                              <Icon size={14} />
                            )}
                          </div>
                          <span
                            className={`text-[9px] sm:text-[11px] text-center whitespace-nowrap
                              ${
                                isComplete || isCurrent
                                  ? "text-black dark:text-white font-medium"
                                  : "text-gray-400 dark:text-gray-600"
                              }`}
                          >
                            {stage.label}
                          </span>
                        </div>

                        {i < STAGES.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-0.5 sm:mx-1 mb-4 transition-colors
                              ${i < step || isDelivered ? "bg-emerald-600" : "bg-gray-200 dark:bg-neutral-800"}`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Order total */}
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
                  <p className="text-sm text-black dark:text-white">
                    Total:{" "}
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
