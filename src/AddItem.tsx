import { useState } from "react";
import { FC } from "react";

const AddItem: FC<{ addFunc: Function }> = ({ addFunc }) => {
  const [Item, setItem] = useState("");

  function addItem() {
    addFunc({ title: Item, checked: false });
    setItem("");
  }

  return (
    <div className="AddBox">
      <input
        className="inpBox"
        type="text"
        value={Item}
        onChange={(_) => setItem(_.target.value)}
        onKeyPress={(_) => (_.key === "Enter" ? addItem() : "")}
      />
      <input type="button" className="AddBtn" onClick={addItem} value="+" />
    </div>
  );
};

export default AddItem;
