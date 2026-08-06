import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import PageItem from "../components/PageItem";

export default function Category({ cart, addToCart, increment, decrement }) {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`,
      );
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-10">
      <div className="px-4 sm:px-6 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 mb-6 text-black dark:text-white
                     hover:text-emerald-500 hover:underline transition-colors"
        >
          <IconArrowNarrowLeft stroke={1} />
          Back to Home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8 capitalize">
          {categoryName}
        </h1>
      </div>

      {loading ? (
        <div>
          <p className="text-center text-black dark:text-white py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              className="inline"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#d1d5db"
                stroke-width="5"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#16a34a"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="90 126"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">
          No products found in this category.
        </p>
      ) : (
        <PageItem
          page={products}
          cart={cart}
          addToCart={addToCart}
          increment={increment}
          decrement={decrement}
          showCart={false}
        />
      )}
    </div>
  );
}
