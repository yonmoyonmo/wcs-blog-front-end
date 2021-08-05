import { useCookies } from "react-cookie";
import style from "../../styles/Layout.module.css";
import { useRouter } from "next/router";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const router = useRouter();
  const token = cookie.userToken;
  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <p style={{ fontSize: "1rem" }}>
        이 웹사이트는 후로그래머 여원모의 싸이버 실험실입니다.
      </p>
      <p style={{ fontSize: "1rem" }}>행복하세요~!</p>
      <div className={style.card}>
        <a
          style={{ fontSize: "1rem" }}
          href="https://wonmocyberschool.tistory.com"
        >
          원모의 티스토리 블로그
        </a>
      </div>
      <br />
      <div className={style.card}>
        <a style={{ fontSize: "1rem" }} href="https://github.com/yonmoyonmo">
          원모의 GITHUB
        </a>
      </div>
    </div>
  );
};

export default about;
