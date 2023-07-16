function CategoryBar({
  list,
  handleClick,
  active,
}: {
  list: string[];
  handleClick: any;
  active: string;
}) {
  return (
    <>
      {list.map((item) => (
        <button
          key={item}
          onClick={() => handleClick(item)}
          className={active == item ? "selected" : ""}
        >
          {item}
        </button>
      ))}
    </>
  );
}

export default CategoryBar;
