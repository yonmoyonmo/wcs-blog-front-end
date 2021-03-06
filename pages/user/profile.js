import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { endpointMania } from "../../util/enpointMania";
import defaultProfile from "../../assets/IMG_20200223_160143.jpg";
import style from "../../styles/Layout.module.css";

const profile = ({ profile }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["userToken"]);

  const router = useRouter();
  useEffect(() => {
    if (profile.success && profile.data.owner.nickname === null) {
      if (confirm("닉네임이 없으시네요? 지금 바로 하나 만들어 보시죠?")) {
        router.push("/user/nickname");
      } else {
        return;
      }
    }
  }, []);

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

      <div style={{ textAlign: "center" }}>
        {profile.success ? (
          <button
            style={{ margin: "1rem" }}
            onClick={(e) => {
              e.preventDefault();
              console.log(cookie);
              removeCookie("userToken", { path: "/" });
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem", margin: "1rem" }}>
            <p style={{ textAlign: "center" }}>로그인 필요합니다</p>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/signin");
                }}
              >
                <Link href="/signin">LOGIN</Link>
              </button>
            </div>
          </div>
        )}
      </div>

      {profile.success ? (
        <div className="window-body" style={{ textAlign: "center" }}>
          <div style={{ width: "300px" }}>
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

          <div style={{ margin: "1rem" }}>
            <p>{profile.data.owner.email}</p>
          </div>

          <div style={{ margin: "1rem" }}>
            <p>{profile.data.owner.username}</p>
          </div>

          <div style={{ margin: "1rem" }}>
            <p>닉네임 : {profile.data.owner.nickname}</p>
          </div>
          <div style={{ margin: "1rem" }}>
            <p>{profile.data.description}</p>
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/user/update");
              }}
            >
              <Link href="/user/update">프로파일 수정</Link>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const tokenFromCookie = (str) => {
  if (!str) {
    return "";
  } else {
    console.log("cookie string : " + str);
    str = str.split("; ");
    console.log("splited cookie string : " + str);
    let result = {};
    for (var i = 0; i < str.length; i++) {
      var cur = str[i].split("=");
      result[cur[0]] = cur[1];
      console.log("cur : " + cur.toString());
    }
    console.log("result.userToken : " + result.userToken);
    return result.userToken;
  }
};

export async function getServerSideProps(context) {
  const cookie = context.req ? context.req.headers.cookie : "";
  const token = tokenFromCookie(cookie);
  console.log("token : " + token);
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
