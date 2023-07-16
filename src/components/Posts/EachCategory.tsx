import { useState, useEffect } from "react";

function EachCategory({ name, list, handleChange }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (list.includes(`${name}`)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [list, name]);

  return (
    <div className="eachCategory">
      <label htmlFor={name}>{name}</label>
      <input type="checkbox" id={name} checked={isChecked} onChange={()=>handleChange(name)} />
    </div>
  );
}

export default EachCategory;
