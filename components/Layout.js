import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Nav></Nav>
      <br/>
        <div className={styles.container}>
            <Head>
              <title>wonmo cyber shcool</title>
            </Head>
            <div>
              <main>{children}</main>
            </div>
          </div>
    </>
  );
};

export default Layout;
