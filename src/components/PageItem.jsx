import PageList from "./PageList";

export default function PageItem({
  page,
  setPage,
  cart,
  addToCart,
  increment,
  decrement,
  showCart = true,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-4 sm:px-6 md:px-10">
      {page.map((paging) => {
        return (
          <div key={paging.id}>
            <PageList
              paging={paging}
              cart={cart}
              addToCart={addToCart}
              increment={increment}
              decrement={decrement}
              showCart={showCart}
            />
          </div>
        );
      })}
    </div>
  );
}
