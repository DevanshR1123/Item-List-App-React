import { FC, lazy, Suspense } from "react";
import loader from "./loader";
import ItemObj from "./types";

const ItemList: FC<{
  items: ItemObj[];
  changeFunc: Function;
  rmvFunc: Function;
}> = ({ items, changeFunc, rmvFunc }) => {
  const Item = lazy(() => import("./Item"));
  return (
    <div className="itemList">
      <Suspense fallback={loader()}>
        {items.map((item, index) => (
          <Item
            title={item.title}
            checked={item.checked}
            key={index}
            id={item.id}
            stateFunc={changeFunc}
            removeFunc={rmvFunc}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default ItemList;
