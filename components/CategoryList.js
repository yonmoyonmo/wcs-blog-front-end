import Link from "next/link";

const CategoryList = ({ category }) => {
  const cateId = category.id;
  const cateName = category.title;

  return (
    <div className="field-row" style={{ justifyContent: "center" }}>
      <button>
        <Link href={`/postlist/${cateId}?name=${cateName}`}>
          {category.title}
        </Link>
      </button>
    </div>
  );
};

export default CategoryList;
