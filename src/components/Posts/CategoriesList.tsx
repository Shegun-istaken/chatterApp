import EachCategory from "./EachCategory";
import categories from "../../assets/data/categories";

function CategoriesList({ list, handleChange }) {
  return (
    <div className="categoryList">
      {categories.map((item, index) => (
        <EachCategory
          key={`${index}${item}`}
          list={list}
          name={item}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}

export default CategoriesList;
