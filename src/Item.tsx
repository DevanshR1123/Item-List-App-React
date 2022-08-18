import { useState } from "react";
import { FC } from "react";

const Item: FC<{
  title: string;
  checked: boolean;
  id: number;
  stateFunc: Function;
  removeFunc: Function;
}> = ({ title, checked, id, stateFunc, removeFunc }) => {
  const [checkedState, setChecked] = useState(checked);

  function changeState() {
    setChecked(!checkedState);
    stateFunc(id);
  }

  return (
    <div className="item" onDoubleClick={(_) => removeFunc(id)}>
      <input
        type="checkbox"
        className="doneCheck"
        checked={checked}
        onChange={changeState}
      />
      <h3 className="itemName">{title}</h3>
      <b className="rmvBtn" onClick={(_) => removeFunc(id)}>
        X
      </b>
    </div>
  );
};

export default Item;
