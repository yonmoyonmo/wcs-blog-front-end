import { useCookies } from "react-cookie";
import Head from "next/head";
import style from "../../styles/Layout.module.css";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  return (
    <>
      <div className="window-body" style={{ width: "100%" }}>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <p>이 웹사이트의 존재 이유 : 재미, 원모의 웹 프로그래밍 실험</p>
        </div>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <p>purpose of this website : fun, expremental</p>
        </div>
      </div>
      <div className="field-row" style={{ justifyContent: "center" }}>
        <button>
          <a href="https://wonmocyberschool.tistory.com">
            click! 원모의 티스토리 블로그
          </a>
        </button>
      </div>
      <div className="field-row" style={{ justifyContent: "center" }}>
        <button>
          <a href="https://github.com/yonmoyonmo">click! 원모의 GITHUB</a>
        </button>
      </div>
    </>
  );
};

export default about;
