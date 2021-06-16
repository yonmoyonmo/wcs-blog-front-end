import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
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
          {categories.success !== null ? (
            categories.data.map((category) => {
              return (
                <li>
                  <Link href="/">{category.title}</Link>
                </li>
              );
            })
          ) : (
            <li>no categories</li>
          )}
        </ul>
      </div>
      <div className={style.grid}>
        <div className={style.card}>
          <Link href="/about">about</Link>
        </div>
        <div className={style.card}>
          <p>{token}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/admin/public/category/list", {
    method: "GET",
  });
  const categories = await res.json();
  if (categories.success === false) {
    console.log(categories.message);
    return null;
  }
  return {
    props: {
      categories,
    },
  };
}
