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
      <Header props={"wonmo cyber school 2.1"}></Header>
      <div className={style.grid}>
        {categories.success ? (
          categories.data.map((category) => {
            return (
              <div key={category.id}>
                <div className="window-body">
                  <div className="window">
                    <div className="title-bar" style={{ width: "300px" }}>
                      <div className="title-bar-text">{category.title}</div>
                      <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                      </div>
                    </div>
                    <CategoryList
                      category={category}
                      key={category.id}
                    ></CategoryList>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <li>no categories</li>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(endpointMania("/admin/public/category/list"), {
      method: "GET",
    });
    try {
      let categories = await res.json();
      if (categories.data !== null) {
        categories.data = categories.data.sort((a, b) => {
          return b.id - a.id;
        });
      }
      return {
        props: {
          categories,
        },
      };
    } catch (e) {
      console.log("home page getServerSideProps catch 1");
      console.log(e);
      const categories = { success: false };
      return { props: { categories } };
    }
  } catch (e) {
    console.log("home page getServerSideProps catch 2");
    console.log(e);
    const categories = { success: false };
    return { props: { categories } };
  }
}
