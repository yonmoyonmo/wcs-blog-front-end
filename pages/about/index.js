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
        about
        <p>aaaaabout</p>
        <a href="/">to home</a>
        <p className={style.card}>{token}</p>
      </div>
    </>
  );
};

export default about;
