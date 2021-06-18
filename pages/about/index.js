import { useCookies } from "react-cookie";
import Head from "next/head";
import style from "../../styles/Layout.module.css";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  return (
    <>
      <Head>
        <title>about</title>
      </Head>
      <div className={style.container}>
        <h1>about</h1>
        <a href="/">to home</a>
      </div>
    </>
  );
};

export default about;
