import { useEffect, useState } from "react";
import PageItem from "./PageItem";
import Nav from "./Nav.jsx";
import ItemCard from "./ItemCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "../pages/Checkout.jsx";
import { Data } from "../../api/data.js";

export default function Homepage({
  page,
  setPage,
  pageLoading,
  setPageLoading,
  id,
  setId,
  item,
  setItem,
  isLoading,
  setIsLoading,
  cart,
  setCart,
  increment,
  decrement,
  totalItems,
  query,
  setQuery,
  addToCart,
  filteredResults,
  removeFromCart,
  darkMode,
  setDarkMode,
}) {
  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    async function loadThePage() {
      const res = await fetch(url);
      const data = await res.json();
      setPage([...data, ...Data]);
      setPageLoading(false);
    }
    loadThePage();
  }, []);

  return (
    <div
      id="top"
      className="dark:bg-neutral-950 min-h-screen scroll-smooth md:scroll-auto"
    >
      <Nav
        id={id}
        setId={setId}
        item={item}
        setItem={setItem}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        totalItems={totalItems}
        query={query}
        setQuery={setQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="relative">
        {id && (
          <div className="absolute top-0 left-0 w-full z-1000">
            <ItemCard
              id={id}
              setId={setId}
              item={item}
              setItem={setItem}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        )}
      </div>

      <div className="py-10">
        {pageLoading ? (
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
        ) : (
          <div>
            <PageItem
              page={filteredResults}
              setPage={setPage}
              cart={cart}
              addToCart={addToCart}
              increment={increment}
              decrement={decrement}
            />
            <footer className="border-t border-gray-200 dark:border-neutral-800 py-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                New arrivals soon.{" "}
                <a
                  href="#top"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Go back to top
                </a>
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
