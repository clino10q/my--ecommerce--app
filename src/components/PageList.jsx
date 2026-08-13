import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function PageList({
  paging,
  cart,
  addToCart,
  increment,
  decrement,
  showCart = true,
}) {
  const cartEntry = cart?.[paging.id];
  const quantity = cartEntry?.quantity;
  return (
    <div
      className="flex flex-col gap-8 p-3 sm:p-4 h-103 rounded-md
                 bg-white dark:bg-neutral-900
                 shadow-lg dark:shadow-none
                 border border-transparent dark:border-neutral-800
                 hover:shadow-xl dark:hover:border-emerald-600
                 transition-all"
    >
      <Link to={`/product/${paging.id}`}>
        <img
          className="w-full h-[250px] object-contain bo rder-none"
          src={paging.image}
          alt={paging.title}
          title={paging.description}
        />
      </Link>

      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col h-full">
          <Link to={`/product/${paging.id}`}>
            <h2
              className="font-bold text-[18px] sm:text-[14px] text-emerald-600 dark:text-emerald-400 line-clamp-1"
              title={paging.title}
            >
              {paging.title}
            </h2>
          </Link>

          <h1>Sup</h1>
        </div>

        <div className="flex gap-2 justify-between w-full items-center">
          <Ratings paging={paging} />

          {showCart &&
            (quantity ? (
              <div
                className="flex items-center justify-between w-full rounded-md
                               bg-emerald-800 text-white overflow-hidden"
              >
                <button
                  onClick={() => decrement(paging.id)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <IconMinus size={16} />
                </button>
                <span className="text-sm sm:text-[18px] font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => increment(paging.id)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-1.75 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <IconPlus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(paging.id)}
                className="px-2 py-3 sm:py-2 rounded-md text-sm sm:text-[18px] bg-emerald-800 font-bold
           w-full text-center text-white hover:bg-emerald-700
           transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
