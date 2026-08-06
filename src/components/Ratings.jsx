export default function Ratings({ paging }) {
  const percentage = (paging.rating.rate / 5) * 100;

  function formatCompact(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    }
    return num.toString();
  }
  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center gap-1">
        <div className="relative inline-block text-base text-stone-300 tracking-wide">
          ★★★★★
          <div
            className="absolute top-0 left-0 whitespace-nowrap overflow-hidden text-yellow-400"
            style={{ width: `${percentage}%` }}
          >
            ★★★★★
          </div>
        </div>
        <span className="text-black font-bold -mb-[2px] dark:text-stone-400">
          {paging.rating.rate}
        </span>
      </div>

      <span className="text-sm text-[#666] -m-5px self-start">
        {formatCompact(paging.rating.count)}
      </span>
    </div>
  );
}
