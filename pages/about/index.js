import { useCookies } from "react-cookie";
import style from "../../styles/Layout.module.css";
import { useRouter } from "next/router";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const router = useRouter();
  const token = cookie.userToken;
  return (
    <div>
      <h1>준비중</h1>
      <div className={style.card}>
        <a
          style={{ fontSize: "1rem" }}
          href="https://wonmocyberschool.tistory.com"
        >
          click! 원모의 티스토리 블로그
        </a>
      </div>
      <br />
      <div className={style.card}>
        <a style={{ fontSize: "1rem" }} href="https://github.com/yonmoyonmo">
          click! 원모의 GITHUB
        </a>
      </div>
    </div>
  );
};

export default about;
