import styles from "../styles/Layout.module.css";
import Nav from "./Nav";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Nav></Nav>
      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">content window</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <Head>
              <title>wonmo cyber shcool</title>
            </Head>
            <div>
              <main>{children}</main>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
