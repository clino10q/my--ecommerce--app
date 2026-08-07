import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  IconArrowRight,
  IconTruck,
  IconShieldCheck,
  IconRotate,
  IconStarFilled,
  IconShoppingBag,
  IconDeviceLaptop,
  IconDiamond,
  IconShirt,
  IconCheckbox,
  IconSparklesFilled,
} from "@tabler/icons-react";
import LandingNav from "./LandingNav";

export default function LandingPage({ currentUser, addToCart }) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  function handleCategoryClick(category) {
    const destination = `/category/${encodeURIComponent(category)}`;

    if (currentUser) {
      navigate(destination);
    } else {
      navigate("/login", {
        state: {
          redirectTo: destination,
        },
      });
    }
  }

  function handleAddToCart(product) {
    if (currentUser) {
      addToCart(product.id);
      navigate("/checkout");
    } else {
      navigate("/login", {
        state: {
          redirectTo: "/checkout",
          productToAdd: product.id,
        },
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const categoryRes = await fetch(
        "https://fakestoreapi.com/products/categories",
      );

      const categories = await categoryRes.json();

      setCategories(categories);

      const productRes = await fetch(
        "https://fakestoreapi.com/products?limit=4",
      );

      const products = await productRes.json();

      setFeaturedProducts(products);
    }

    fetchData();
  }, []);

  const icons = {
    electronics: <IconDeviceLaptop size={35} />,
    jewelery: <IconDiamond size={35} />,
    "men's clothing": <IconShirt size={35} />,
    "women's clothing": <IconShoppingBag size={35} />,
  };

  const [newsLetter, subNewsletter] = useState("");
  const [hasnewsLetter, hassubNewsletter] = useState(false);

  function subscribe(e) {
    e.preventDefault();

    if (newsLetter === "") {
      return;
    }
    hassubNewsletter(true);

    setTimeout(() => {
      subNewsletter("");
      hassubNewsletter(false);
    }, 2000);
  }

  const successful = {
    icon: <IconCheckbox stroke={2} />,
  };

  const successIcon = successful.icon;

  return (
    <div className="bg-white">
      <LandingNav />
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 "
        data-aos="fade-down"
        id="hero"
      >
        {/* Background circles */}

        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-emerald-300 blur-3xl opacity-30 pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-emerald-200 blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}

            <div>
              <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight text-gray-900 ">
                Elevate
                <br />
                Your Style.
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-600  max-w-xl">
                Shop premium fashion, electronics and jewelry curated for
                everyday life. Discover quality products you'll love at prices
                you'll appreciate.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 ">
                <Link
                  to="/signup"
                  className="cursor-pointer px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-lg"
                >
                  Shop Now
                </Link>

                <button
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 rounded-xl border border-gray-300 hover:bg-gray-100  transition"
                >
                  Browse Categories
                </button>
              </div>

              {/* STATS */}

              <div className="mt-14 grid grid-cols-3 gap-8">
                <div>
                  <h2 className="text-3xl font-bold">50K+</h2>
                  <p className="text-gray-500 text-sm">Happy Customers</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold">10K+</h2>
                  <p className="text-gray-500 text-sm">Products</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-1">
                    4.9
                    <IconStarFilled size={18} className="text-yellow-500" />
                  </h2>

                  <p className="text-gray-500 text-sm">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="relative flex justify-center">
              <div className="absolute w-[450px] h-[450px] rounded-full bg-emerald-400 blur-3xl opacity-20" />

              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
                alt="Fashion Shopping"
                className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>{" "}
      {/* ===================== TRUST SECTION ===================== */}
      <section className="border-y border-gray-200  bg-white ">
        <div
          className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8"
          data-aos="fade-right"
        >
          <TrustItem
            icon={<IconTruck size={28} />}
            title="Fast Shipping"
            text="Free delivery on qualifying orders."
          />

          <TrustItem
            icon={<IconShieldCheck size={28} />}
            title="Secure Payments"
            text="Encrypted checkout keeps your purchases safe."
          />

          <TrustItem
            icon={<IconRotate size={28} />}
            title="Easy Returns"
            text="30-day hassle-free returns."
          />
        </div>
      </section>
      {/* ===================== CATEGORIES ===================== */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-24">
        <div
          className="flex items-center justify-between mb-12"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 ">
              Shop by Category
            </h2>

            <p className="mt-3 text-gray-500 ">
              Find exactly what you're looking for.
            </p>
          </div>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          data-aos="fade-up"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                
                bg-white
               
                p-8
                text-left
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-emerald-500
                cursor-pointer
              "
            >
              <div className="text-emerald-600 mb-6">{icons[category]}</div>

              <h3 className="text-xl font-bold capitalize text-gray-900">
                {category}
              </h3>

              <p className="mt-3 text-sm text-gray-500 ">
                Explore our latest collection of {category.toLowerCase()}.
              </p>

              <span
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-emerald-600
                  group-hover:gap-3
                  transition-all
                "
              >
                Shop Now
                <IconArrowRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </section>
      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="bg-gray-50  py-24" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 ">
              Featured Products
            </h2>

            <p className="mt-4 text-gray-500 ">
              Hand-picked favorites loved by our customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="
                  group
                  rounded-2xl
                  bg-white
                  overflow-hidden
                  shadow-sm
                  hover:shadow-2xl
                  transition
                "
                data-aos="zoom-in"
              >
                <div className="h-64 bg-white flex items-center justify-center p-8">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="
                      h-44
                      object-contain
                      transition
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold h-12 overflow-hidden text-gray-900 ">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1 mt-3">
                    <IconStarFilled size={16} className="text-yellow-500" />

                    <span className="text-sm text-gray-500">
                      {product.rating.rate}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600">
                      ${product.price}
                    </span>

                    <button
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-emerald-600
                        hover:bg-emerald-700
                        text-white
                        transition
                      "
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* ===================== TESTIMONIALS ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-24" id="testimonial">
        <div className="text-center mb-14" data-aos="slide-right">
          <h2 className="text-4xl font-bold text-gray-900 ">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-500 ">
            Thousands of shoppers trust Uniform every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              review:
                "Absolutely love the quality. Delivery was quick and everything arrived exactly as expected.",
            },
            {
              name: "Michael Brown",
              review:
                "I've ordered several times now. Uniform never disappoints. Highly recommended!",
            },
            {
              name: "Jessica Wilson",
              review:
                "Great customer support and premium products at affordable prices.",
            },
          ].map((item, index) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white  border border-gray-200  p-8 hover:shadow-xl transition"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
              data-aos-offset="200"
            >
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconStarFilled
                    key={index}
                    size={18}
                    className="text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-600  leading-7">"{item.review}"</p>

              <h3 className="mt-6 font-bold text-gray-900 ">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* ===================== NEWSLETTER ===================== */}
      <section className="bg-emerald-600">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white">Stay Updated</h2>

          <p className="mt-4 text-emerald-100">
            Subscribe to receive exclusive discounts, new arrivals, and special
            offers.
          </p>

          <form
            className="mt-10 flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => subscribe(e)}
          >
            <input
              type="email"
              value={newsLetter}
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-5 py-4 outline-none bg-white"
              onChange={(e) => subNewsletter(e.target.value)}
            />

            <button
              className="rounded-xl
                px-8
                py-4
                bg-black
                text-white
                hover:bg-neutral-800
                transition
                font-semibold"
              type="submit"
            >
              {hasnewsLetter ? (
                <div className="flex flex-row ">
                  <span
                    className="inline
                  "
                  >
                    {successful.icon}
                  </span>
                  <span className="inline">Subscribed</span>
                </div>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
      </section>
      {/* ===================== CTA ===================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black text-gray-900 ">
            Ready to Upgrade Your Style?
          </h2>

          <p className="mt-5 text-lg text-gray-500 ">
            Join thousands of happy customers shopping premium fashion,
            electronics, and jewelry.
          </p>

          <Link
            to="/signup"
            className="
              inline-flex
              items-center
              gap-2
              mt-10
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              px-8
              py-4
              rounded-xl
              font-bold
              transition
            "
          >
            Start Shopping
            <IconArrowRight size={20} />
          </Link>
        </div>
      </section>
      {/* ===================== FOOTER ===================== */}
      <footer className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-3xl font-black text-emerald-500">Uniform</h2>

            <p className="mt-5 text-neutral-400 leading-7">
              Your destination for premium fashion, electronics and jewelry.
              Built for quality, style and affordability.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-5">Shop</h3>

            <ul className="space-y-3 text-neutral-400">
              <li>Men's Clothing</li>
              <li>Women's Clothing</li>
              <li>Electronics</li>
              <li>Jewelry</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-5">Company</h3>

            <ul className="space-y-3 text-neutral-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-5">Support</h3>

            <ul className="space-y-3 text-neutral-400">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-6 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} Uniform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ===================== TRUST ITEM ===================== */

function TrustItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 rounded-full bg-emerald-100  flex items-center justify-center text-emerald-600">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-lg text-gray-900 ">{title}</h3>

        <p className="text-gray-500 ">{text}</p>
      </div>
    </div>
  );
}
