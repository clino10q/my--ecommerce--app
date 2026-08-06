import { Link } from "react-router-dom";

export default function ItemList({ item, setId, isLoading, setIsLoading }) {
  return (
    <div className="">
      <div className="px-90 pt-0.5">
        <div className="flex gap-4 shadow-md px-3 pb-2 rounded-b-md dark:shadow-white bg-white opacity-100 dark:shadow-sm dark:bg-black">
          <img className="w-20 " src={item.image} />
          <div>
            <h2 className="font-bold text-emerald-600">{item.title}</h2>
            <hr className="text-gray-200" />
            <Link
              to={`/category/${encodeURIComponent(item.category)}`}
              onClick={(e) => {
                e.stopPropagation();
                setId("");
              }}
            >
              <span className=" p-0 font-bold hover:text-emerald-800 hover:underline dark:text-white">
                {item.category}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
