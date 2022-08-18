import { FC, useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import AddItem from "./AddItem";
import ItemObj from "./types";
import axios from "axios";
import loader from "./loader";

const App: FC = () => {
  const ItemList = lazy(() => import("./ItemList"));

  const [Items, setItems] = useState<ItemObj[]>([]);
  const url = `./`;

  useEffect(() => {
    async function getList() {
      const list = await (await axios.get(`${url}db`)).data;
      setItems(list["items"]);
    }
    getList();
  }, [url]);

  async function addItem(item: ItemObj) {
    if (!item.title) return;
    let res: ItemObj = await (await axios.post(`${url}add`, item)).data;
    setItems((i) => [...i, res]);
  }

  async function changeState(id: number) {
    let updItems = Items.slice();
    let i = updItems.findIndex((item) => item.id === id);
    updItems[i].checked = !Items[i].checked;
    setItems(updItems);
    axios.post(`${url}upd?id=${id}`);
  }

  function removeFunc(id: number) {
    setItems(Items.filter((_) => _.id !== id));
    axios.delete(`${url}rmv?id=${id}`);
  }

  return (
    <div className="wrapper">
      <AddItem addFunc={addItem} />
      <Suspense fallback={loader()}>
        <ItemList items={Items} changeFunc={changeState} rmvFunc={removeFunc} />
      </Suspense>
    </div>
  );
};

export default App;
