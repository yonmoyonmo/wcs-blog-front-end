import Link from "next/link";
import { useRouter } from "next/router";

const CategoryList = ({ category }) => {
  const router = useRouter();
  const cateId = category.id;
  const cateName = category.title;

  return (
    <div className="field-row" style={{ justifyContent: "center" }}>
      <button
        style={{ width: "100%" }}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/postlist/${cateId}?name=${cateName}`);
        }}
      >
        <Link href={`/postlist/${cateId}?name=${cateName}`}>
          {category.title}
        </Link>
      </button>
    </div>
  );
};

export default CategoryList;
