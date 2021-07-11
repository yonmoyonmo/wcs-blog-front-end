import Header from "../components/Header";
import CategoryList from "../components/CategoryList";
import { useCookies } from "react-cookie";
import { endpointMania } from "../util/enpointMania";

export default function Home({ categories }) {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  return (
    <>
      <Header props={"원모 싸이버 스쿨 2.0"}></Header>
      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">category list</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>
              categories
            </p>
          </div>

          {categories.success ? (
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
        </div>
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
