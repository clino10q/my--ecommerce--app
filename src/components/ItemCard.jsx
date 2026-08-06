import ItemList from "./ItemList";

export default function ItemCard({ item, setId, isLoading, setIsLoading }) {
  return (
    <div>
      <ItemList
        key={item.id}
        item={item}
        setId={setId}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
