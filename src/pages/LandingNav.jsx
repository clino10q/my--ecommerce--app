import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  const [shrink, setShrink] = useState(false);

  return (
    <nav className="flex justify-between overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 items-center py-[15px] px-6 w-full z-1000 sticky top-0 left-0 backdrop-blur-xs">
      <div className="text-[2rem] font-bold text-emerald-400 tracking-tight">
        <a href=""> Uniform</a>
      </div>

      <div className="flex flex-row md:flex-row-reverse md:gap-[20px]">
        <div className="flex justify-between gap-[4px] relative">
          <button
            className="flex flex-col justify-center gap-[5px] bg-none cursor-pointer p-[8px] w-[50px] h-[35px] md:hidden"
            onClick={() => setShrink(!shrink)}
          >
            <span
              className={`block w-[24px] h-[2px] bg-white rounded-sm ease-[0.3s] ${
                shrink ? "transform rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`block w-[24px] h-[2px] bg-white rounded-sm ease-[0.3s] ease-[0.3s] ${
                shrink ? "opacity-0" : "opacity-100"
              }
              }`}
            ></span>
            <span
              className={`block w-[24px] h-[2px] bg-white rounded-sm ease-[0.3s] ease-[0.3s] ${
                shrink ? "transform -rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>
        <div
          className={`flex gap-[50px] items-center relative max-md:absolute max-md:gap-[15px] max-md:flex-col max-md:w-[220px] max-md:p-[12px] max-md:top-[60px] max-md:right-[0px] max-md:rounded-xl  max-md:transition-opacity max-md:transition-transform max-md:duration-300 max-md:ease-in-out max-md:z-[999] ${
            shrink
              ? "max-md:opacity-100 max-md:visible max-md:translate-y-0 shadow-lg "
              : "max-md:opacity-[0] max-md:invisible max-md:-translate-y-2.5"
          }
        `}
        >
          <a
            className="font-medium text-emerald-400 cursor-pointer transition hover:text-green-800"
            href="#hero"
          >
            Home
          </a>
          <a
            className="font-medium text-emerald-400 cursor-pointer transition hover:text-green-800"
            href="#categories"
          >
            Category
          </a>
          <a
            className="font-medium text-emerald-400 cursor-pointer transition hover:text-green-800"
            href="#products"
          >
            Products
          </a>
          <a
            className="font-medium text-emerald-400 cursor-pointer transition hover:text-green-800"
            href="#testimonial"
          >
            Testimonials
          </a>
        </div>
      </div>
      <div>
        <Link
          to="/signup"
          className="-mt-10 cursor-pointer px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </nav>
  );
}
