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
      {profile.success ? (
        <div className={style.card}>
          <br />
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
          <br></br>
        </div>
      ) : (
        <></>
      )}

      <br />
      <br />
    </div>
  );
};

const tokenFromCookie = (cookie) => {
  if (!cookie) {
    return "";
  } else {
    const parsedCookie = cookie.split("userToken=");
    console.log(parsedCookie);
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
