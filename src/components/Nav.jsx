import { Link } from "react-router-dom";
import Search from "./Search";
import { IconShoppingCart, IconSearch, IconX } from "@tabler/icons-react";
import UserMenu from "./UserMenu";
import { useState, useEffect } from "react";

export default function Nav({
  totalItems,
  query,
  setQuery,
  darkMode,
  setDarkMode,
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      <nav
        className="flex items-center justify-between gap-2 px-4 sm:px-6 md:px-10 py-4
                   bg-white dark:bg-neutral-950
                   border-b border-gray-100 dark:border-neutral-800
                   shadow-sm"
      >
        <Link to="/shop">
          <h1 className="text-xl sm:text-2xl font-semibold text-emerald-700 flex-shrink-0">
            Uniform
          </h1>
        </Link>

        {/* Search bar — hidden on mobile, shown inline from md up */}
        <div className="hidden md:flex gap-1 flex-1 max-w-md mx-4">
          <Search query={query} setQuery={setQuery} />
          <button
            className="px-6 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium
                       hover:bg-emerald-700 transition-colors flex-shrink-0"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search icon — mobile only, toggles the search row below */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full
                       border border-gray-200 dark:border-neutral-700
                       hover:border-emerald-600 transition-colors cursor-pointer"
          >
            {showMobileSearch ? (
              <IconX size={20} className="text-black dark:text-white" />
            ) : (
              <IconSearch size={20} className="text-black dark:text-white" />
            )}
          </button>

          <Link to="/checkout">
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded-full
                       border border-gray-200 dark:border-neutral-700
                       hover:border-emerald-600 transition-colors"
            >
              <IconShoppingCart
                stroke={2}
                size={20}
                className="text-black dark:text-white"
              />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs
                           font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          <UserMenu darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </nav>

      {/* Mobile search row — appears below nav when toggled */}
      {showMobileSearch && (
        <div
          className="md:hidden flex gap-2 px-4 sm:px-6 py-3
                         bg-white dark:bg-neutral-950
                         border-b border-gray-100 dark:border-neutral-800"
        >
          <Search query={query} setQuery={setQuery} />
          <button
            className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium
                       hover:bg-emerald-700 transition-colors flex-shrink-0"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}
