import EachCategory from "./EachCategory";

function CategoriesList({ list, handleChange }) {
  const categories = [
    "sports",
    "entertainment",
    "fashion",
    "technology",
    "art",
    "culture",
    "health",
    "science",
  ];

  return (
    <div>
      <div>
        {categories.map((item, index) => (
          <EachCategory
            key={`${index}${item}`}
            list={list}
            name={item}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
