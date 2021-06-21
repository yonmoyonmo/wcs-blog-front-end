import Link from "next/link";

const CategoryList = ({ category }) => {
  const cateId = category.id;

  return (
    <div>
      <ul>
        <li>
          <Link href={`/postlist/${cateId}`}>{category.title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;
