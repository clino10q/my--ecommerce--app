import { useParams, useNavigate } from "react-router-dom";
import { IconMinus, IconPlus, IconArrowLeft } from "@tabler/icons-react";
import Ratings from "../components/Ratings";
import { useState } from "react";

// Fake Store API has no "colors" field — this generates a stable mock
// palette per product so swatches don't flicker on re-render. Swap this
// out once you have real color data.
function mockColors(id) {
  const palettes = [
    ["#1F3B2C", "#C1652F", "#1C1C1A"],
    ["#3C6E47", "#E4DED0", "#1C1C1A"],
    ["#4A5A6B", "#1C1C1A", "#C1652F"],
    ["#D4AF37", "#C0C0C0", "#1C1C1A"],
  ];
  return palettes[id % palettes.length];
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail({
  allProducts,
  cart,
  addToCart,
  increment,
  decrement,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((p) => String(p.id) === id);
  const cartEntry = cart?.[product.id];
  const quantity = cartEntry?.quantity;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  if (!allProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-neutral-950">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-neutral-950">
        <p className="dark:text-gray-300">Product not found.</p>
        <button
          onClick={() => navigate("/shop")}
          className="text-emerald-600 dark:text-emerald-400 underline"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const isClothing =
    product.category === "men's clothing" ||
    product.category === "women's clothing";

  const colors = isClothing ? mockColors(product.id) : [];

  function handleAddToCart() {
    if (isClothing && !selectedColor) return; // require a pick first
    addToCart(product.id, selectedColor, selectedSize, selectedQty);
  }

  const missingSelection = isClothing && (!selectedColor || !selectedSize);

  return (
    <div className="min-h-screen dark:bg-neutral-950 px-4 sm:px-6 md:px-10 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm mb-6 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <IconArrowLeft size={18} /> Back
      </button>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left: image */}
        <div
          className="rounded-2xl flex items-center justify-center p-8
                     bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800"
          style={{ minHeight: "420px" }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Right: details */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-2 text-emerald-600 dark:text-emerald-400">
            {product.category}
          </p>
          <h1 className="font-bold text-2xl sm:text-3xl mb-3 dark:text-white">
            {product.title}
          </h1>

          <div className="mb-4 flex">
            <Ratings paging={product} />
          </div>

          <h2 className="font-bold text-2xl mb-5 dark:text-gray-200">
            ${product.price}
          </h2>

          <p className="text-sm leading-relaxed mb-6 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          {/* Colors */}
          {isClothing && (
            <>
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase mb-2 text-gray-500 dark:text-gray-400">
                  Available colors
                </p>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c}`}
                      className="w-8 h-8 rounded-full transition"
                      style={{
                        background: c,
                        outline:
                          selectedColor === c
                            ? "2px solid #1F3B2C"
                            : "2px solid transparent",
                        outlineOffset: "2px",
                        border: "1px solid rgba(0,0,0,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase mb-2 text-gray-500 dark:text-gray-400">
                  Size
                </p>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-md border text-sm font-medium transition-colors
                        ${
                          selectedSize === s
                            ? "bg-emerald-800 text-white border-emerald-800"
                            : "border-gray-300 dark:border-neutral-700 text-black dark:text-white hover:border-emerald-600"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {missingSelection && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Select a color and size to continue
                </p>
              )}
            </>
          )}

          {/* Cart controls, reusing your existing cart state */}
          {!quantity && (
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase mb-2 text-gray-500 dark:text-gray-400">
                Quantity
              </p>
              <div className="flex items-center w-fit rounded-md border border-gray-300 dark:border-neutral-700 overflow-hidden">
                <button
                  onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white"
                >
                  <IconMinus size={16} />
                </button>
                <span className="px-4 text-sm font-bold text-black dark:text-white">
                  {selectedQty}
                </span>
                <button
                  onClick={() =>
                    setSelectedQty((q) => Math.min(product.stock ?? 99, q + 1))
                  }
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-black dark:text-white"
                >
                  <IconPlus size={16} />
                </button>
              </div>
            </div>
          )}

          {quantity ? (
            <div className="flex items-center justify-between w-full max-w-[200px] rounded-md bg-emerald-800 text-white overflow-hidden">
              <button
                onClick={() => decrement(product.id)}
                className="px-3 py-2 hover:bg-emerald-700 transition-colors"
              >
                <IconMinus size={16} />
              </button>
              <span className="font-bold">{quantity}</span>
              <button
                onClick={() => increment(product.id)}
                className="px-3 py-2 hover:bg-emerald-700 transition-colors"
              >
                <IconPlus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={missingSelection}
              className="px-6 py-3 rounded-md font-bold bg-emerald-800 text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
