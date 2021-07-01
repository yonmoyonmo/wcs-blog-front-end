import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import Header from "./Header";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Nav></Nav>
      <Head>
        <title>wonmo cyber shcool</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
