import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { useCookies } from "react-cookie";

import style from "../styles/Layout.module.css";

export default function Home({ categories }) {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  return (
    <>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
      <Header></Header>
      <div>
        <ul>
          {categories.success === true ? (
            categories.data.map((category) => {
              return (
                <CategoryList category={category} key={category.id}></CategoryList>
              );
            })
          ) : (
            <li>no categories</li>
          )}
        </ul>
      </div>

      <div className={style.card}>
        <h3>token</h3>
        <p>{token}</p>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "http://localhost:8000/admin/public/category/list",
      {
        method: "GET",
      }
    );
    const categories = await res.json();
    return {
      props: {
        categories,
      },
    };
  } catch (e) {
    console.log(e);
    const categories = { success: false };
    return { props: { categories } };
  }
}
