import Head from "next/head";
import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { useCookies } from "react-cookie";
import { endpointMania } from "../util/enpointMania";
import style from "../styles/Layout.module.css";

export default function Home({ categories }) {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  
  return (
    <>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
      <Header props={"main page"}></Header>
      <div>
        <ul>
          {categories.success === true ? (
            categories.data.map((category) => {
              return (
                <CategoryList
                  category={category}
                  key={category.id}
                ></CategoryList>
              );
            })
          ) : (
            <li>no categories</li>
          )}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(endpointMania("/admin/public/category/list"), {
      method: "GET",
    });
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
