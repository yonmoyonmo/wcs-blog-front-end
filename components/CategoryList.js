import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/Layout.module.css";

const CategoryList = ({ category }) => {
  const router = useRouter();
  const cateId = category.id;
  const cateName = category.title;

  return (
    <>
      <Link href={`/postlist/${cateId}?name=${cateName}&page=0`}>
        <div style={{ textAlign: "center" }}>
          <br />
          <button>{category.title}</button>
          <p>{category.description}</p>
        </div>
      </Link>
    </>
  );
};

export default CategoryList;
