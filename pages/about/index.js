import { useCookies } from "react-cookie";
import style from "../../styles/Layout.module.css";
import { useRouter } from "next/router";

const about = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const router = useRouter();
  const token = cookie.userToken;
  return (
    <div className="window" style={{ width: "100%" }}>
      <div className="title-bar">
        <div className="title-bar-text">profile</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <p style={{ fontSize: "1rem" }}>
          이 웹사이트는 후로그래머 여원모의 싸이버 실험실입니다.
        </p>
        <p>
          Wonmo Cyber School is not a school. It's wonmo's cyber testing ground.
        </p>
        <div>
          <a
            style={{ fontSize: "1rem" }}
            href="https://wonmocyberschool.tistory.com"
          >
            <button>원모의 티스토리 블로그</button>
          </a>
        </div>

        <div>
          <a style={{ fontSize: "1rem" }} href="https://homepage.wonmonae.com">
            <button>원모 싸이버 스쿨 산하 해적단</button>
          </a>
        </div>
        <div>
          <a style={{ fontSize: "1rem" }} href="https://github.com/yonmoyonmo">
            <button>원모의 깃허브</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default about;
