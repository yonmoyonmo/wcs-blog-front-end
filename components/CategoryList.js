import Link from "next/link";

const CategoryList = ({ category }) => {
  const cateId = category.id;
  
    return (
    <div>
      <Link href='/'>{category.title}</Link>
    </div>
  );
};

export default CategoryList;
