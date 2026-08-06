import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Category from "./pages/Category";
import { Data } from "../api/data";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Toast from "./components/Toast";

function App() {
  const [id, setId] = useState();
  const [item, setItem] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchAllProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setAllProducts([...data, ...Data]);
    }
    fetchAllProducts();
  }, []);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "{}"),
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser") || "null"),
  );

  const [toast, setToast] = useState(null);

  function addToCart(productId, color = null, size = null, quantity = 1) {
    setCart((prev) => ({ ...prev, [productId]: { quantity, color, size } }));
    const product = allProducts.find((p) => p.id === productId);
    setToast({
      id: Date.now(),
      message: product ? `${product.title} added to cart` : "Added to cart",
    });
  }

  function increment(productId) {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: prev[productId].quantity + 1,
      },
    }));
  }

  function decrement(productId) {
    setCart((prev) => {
      const newQty = prev[productId].quantity - 1;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: { ...prev[productId], quantity: newQty },
      };
    });
  }
  const totalItems = Object.values(cart).reduce(
    (sum, entry) => sum + entry.quantity,
    0,
  );

  const [query, setQuery] = useState("");

  const filteredResults = query
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : page;

  function removeFromCart(productId) {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }
  return (
    <BrowserRouter>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onDone={() => setToast(null)}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage currentUser={currentUser} addToCart={addToCart} />
          }
        />
        <Route
          path="/login"
          element={
            <Auth setCurrentUser={setCurrentUser} addToCart={addToCart} />
          }
        />
        <Route
          path="/signup"
          element={
            <Auth setCurrentUser={setCurrentUser} addToCart={addToCart} />
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <Category
              cart={cart}
              addToCart={addToCart}
              increment={increment}
              decrement={decrement}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              allProducts={allProducts}
              cart={cart}
              addToCart={addToCart}
              increment={increment}
              decrement={decrement}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Homepage
              page={page}
              setPage={setPage}
              pageLoading={pageLoading}
              setPageLoading={setPageLoading}
              id={id}
              setId={setId}
              item={item}
              setItem={setItem}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              cart={cart}
              setCart={setCart}
              increment={increment}
              decrement={decrement}
              totalItems={totalItems}
              query={query}
              setQuery={setQuery}
              addToCart={addToCart}
              filteredResults={filteredResults}
              removeFromCart={removeFromCart}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              page={allProducts}
              increment={increment}
              decrement={decrement}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/payment"
          element={<Payment cart={cart} page={page} setCart={setCart} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
