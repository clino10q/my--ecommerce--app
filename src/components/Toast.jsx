import { useEffect, useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    const removeTimer = setTimeout(onDone, 2300); // let fade-out finish before unmounting
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
                  flex items-center gap-2 px-4 py-3 rounded-md max-w-[90vw]
                  bg-emerald-800 text-white text-sm font-medium shadow-lg
                  transition-all duration-300
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <IconCircleCheck size={18} className="flex-shrink-0" />
      <span className="truncate">{message}</span>
    </div>
  );
}
