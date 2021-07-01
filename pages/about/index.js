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
        <p>이것저것 설명함</p>
        <a href="/">to home</a>
      </div>
    </>
  );
};

export default about;
