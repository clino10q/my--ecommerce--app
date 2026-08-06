import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ToggleButton() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="sr-only peer"
      />
      <div
        className="w-12 h-7 bg-emerald-700 rounded-full peer
                   peer-checked:bg-terracotta-500
                   transition-colors duration-300"
      ></div>
      <div
        className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md
                   flex items-center justify-center
                   transition-transform duration-300
                   peer-checked:translate-x-5"
      >
        {darkMode ? (
          <IconMoon size={14} className="text-terracotta-500" />
        ) : (
          <IconSun size={14} className="text-green-600" />
        )}
      </div>
    </label>
  );
}
