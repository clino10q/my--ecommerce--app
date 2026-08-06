import { useState, useRef, useEffect } from "react";
import { IconUser, IconSun, IconMoon } from "@tabler/icons-react";
import { useNavigate, Link } from "react-router-dom";

export default function UserMenu({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  function changeToProfile() {
    navigate("/profile");
  }

  function changeToOrders() {
    navigate("/orders");
  }

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-emerald-600 transition-colors"
      >
        <IconUser size={20} className="text-black dark:text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50">
          <button
            className="w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800"
            onClick={changeToProfile}
          >
            My Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800"
            onClick={changeToOrders}
          >
            My Orders
          </button>

          <div className="border-t border-gray-100 dark:border-neutral-700 my-1"></div>

          <div className="flex items-center justify-between px-4 py-2 text-sm text-black dark:text-white">
            <span className="flex items-center gap-2">
              {darkMode ? <IconMoon size={16} /> : <IconSun size={16} />}
              Dark Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-neutral-700 rounded-full peer peer-checked:bg-emerald-600 transition-colors duration-300"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>

          <div className="border-t border-gray-100 dark:border-neutral-700 my-1"></div>

          <Link to="/login">
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-neutral-800">
              Log Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
