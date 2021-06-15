import Head from "next/head";
import Link from "next/link";
import { useCookies } from "react-cookie";

import style from "../styles/Layout.module.css";

export default function Home() {
  const oauth2EndPoint =
    "http://localhost:7000/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/redirect";

  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  return (
    <>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
      <div className={style.container}>
        <div className={style.card}>
          <Link href={oauth2EndPoint}>oauth 2.0 google test</Link>
        </div>
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
