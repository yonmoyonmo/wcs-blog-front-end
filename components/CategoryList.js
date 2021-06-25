import Link from "next/link";

const CategoryList = ({ category }) => {
  const cateId = category.id;
  const cateName = category.title;
  
  return (
    <div>
      <ul>
        <li>
          <Link href={`/postlist/${cateId}?name=${cateName}`}>{category.title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;
