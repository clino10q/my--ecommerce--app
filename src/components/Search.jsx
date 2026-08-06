export default function Search({ query, setQuery }) {
  return (
    <div className="flex-1">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        className="w-full px-4 py-2 rounded-full border border-gray-200 dark:border-neutral-700
           bg-gray-50 dark:bg-neutral-800
           focus:outline-none focus:ring-2 focus:ring-emerald-400
           text-sm text-black dark:text-white
           placeholder:text-gray-400 dark:placeholder:text-gray-500"
        placeholder="Search..."
      />
    </div>
  );
}
