import Head from "next/head";
import Link from "next/link";
import { useCookies } from "react-cookie";

import style from "../styles/Layout.module.css";

export default function Home() {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  return (
    <>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
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
