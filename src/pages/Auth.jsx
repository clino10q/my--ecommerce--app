import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IconMail,
  IconLock,
  IconUser,
  IconAlertCircle,
} from "@tabler/icons-react";

export default function Auth({ setCurrentUser, addToCart }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/shop";
  const productToAdd = location.state?.productToAdd;
  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  }

  function switchMode(newMode) {
    setMode(newMode);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (mode === "signup") {
      if (!formData.name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (users.some((u) => u.email === formData.email)) {
        setError("An account with this email already exists.");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setCurrentUser?.(newUser);

      if (productToAdd) {
        addToCart(productToAdd);
      }

      navigate(redirectTo);
    } else {
      const match = users.find(
        (u) => u.email === formData.email && u.password === formData.password,
      );
      if (!match) {
        setError("Incorrect email or password.");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(match));
      setCurrentUser?.(match);

      if (productToAdd) {
        addToCart(productToAdd);
      }

      navigate(redirectTo);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="block text-center text-2xl font-semibold text-black dark:text-white mb-8"
        >
          Uniform
        </Link>

        <div
          className="p-6 rounded-md bg-white dark:bg-neutral-900
                         border border-gray-200 dark:border-neutral-800"
        >
          {/* Mode toggle */}
          <div className="flex mb-6 rounded-md bg-gray-100 dark:bg-neutral-800 p-1">
            <button
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 rounded-md text-sm font-bold transition-colors cursor-pointer
                ${
                  mode === "login"
                    ? "bg-white dark:bg-neutral-950 text-black dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
            >
              Log In
            </button>
            <button
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2 rounded-md text-sm font-bold transition-colors cursor-pointer
                ${
                  mode === "signup"
                    ? "bg-white dark:bg-neutral-950 text-black dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-xl font-bold text-black dark:text-white mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {mode === "login"
              ? "Log in to continue shopping."
              : "Sign up to start shopping with Uniform."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <IconUser
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                               bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-emerald-400
                               placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Email
              </label>
              <div className="relative mt-1">
                <IconMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                             bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-emerald-400
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Password
              </label>
              <div className="relative mt-1">
                <IconLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700
                             bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-emerald-400
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400
                               bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-md"
              >
                <IconAlertCircle size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full px-6 py-2.5 rounded-md bg-emerald-600 text-white font-bold
                         hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
