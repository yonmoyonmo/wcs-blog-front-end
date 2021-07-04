import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { endpointMania } from "../../util/enpointMania";
import defaultProfile from "../../assets/sample.png";
import style from "../../styles/Layout.module.css";

const profile = ({ profile }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);

  const router = useRouter();
  useEffect(() => {
    if (profile.success && profile.data.owner.nickname === null) {
      if (confirm("닉네임이 없다? 바아로 하나 만들자? 아님 말고?")) {
        router.push("/user/nickname");
      } else {
        return;
      }
    }
  }, []);

  const logoutFunction = (e) => {
    e.preventDefault();
    try {
      removeCookie("userToken");
      window.location.reload();
    } catch (e) {
      window.alert(`logout 실패 : ${e}`);
    }
    router.push("/");
  };

  return (
    <div>
      {profile.success ? (
        <div style={{ width: "100%" }} className="window">
          <div className="title-bar">
            <div className="title-bar-text">{profile.data.owner.nickname}</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>
          <br />
          <div className="field-row" style={{ justifyContent: "center" }}>
            <div key={profile.data.id} className={style.imageContainer}>
              <img
                src={
                  profile.data.profileImageURL
                    ? profile.data.profileImageURL
                    : defaultProfile
                }
                layout="fill"
                className={style.image}
              ></img>
            </div>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>소개 : {profile.data.description}</p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>이메일 : {profile.data.owner.email}</p>
          </div>

          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>이름 : {profile.data.owner.username}</p>
          </div>

          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>닉네임 : {profile.data.owner.nickname}</p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button>
              <Link href="/user/update">프로파일 수정</Link>
            </button>
          </div>
          <br></br>
        </div>
      ) : (
        <></>
      )}
      <br />
      <br />
      {cookie.userToken ? (
        <button onClick={logoutFunction}>Logout</button>
      ) : (
        <div className="window-body">
          <p style={{ textAlign: "center" }}>로그인 필요</p>
          <p style={{ textAlign: "center" }}>Login</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <Link href="/login">LOGIN</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const tokenFromCookie = (cookie) => {
  if (!cookie) {
    return "";
  } else {
    const parsedCookie = cookie.split("=");
    return parsedCookie[1];
  }
};

export async function getServerSideProps(context) {
  const cookie = context.req ? context.req.headers.cookie : "";
  const token = tokenFromCookie(cookie);
  const userProfileEndpoint = endpointMania("/api/user/profile");

  if (token === "") {
    const profile = { success: false, token: "없음" };
    return { props: { profile } };
  }
  try {
    const res = await fetch(userProfileEndpoint, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const profile = await res.json();
    return {
      props: {
        profile,
      },
    };
  } catch (e) {
    console.log(e);
    const profile = { success: false };
    return { props: { profile } };
  }
}

export default profile;
