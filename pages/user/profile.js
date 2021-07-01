import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { endpointMania } from "../../util/enpointMania";
import Image from "next/image";
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
        <>
          <div key={profile.data.id} className={style.imageContainer}>
            <Image
              src={
                profile.data.profileImageURL
                  ? profile.data.profileImageURL
                  : "/public/default.png"
              }
              layout="fill"
              className={style.image}
            ></Image>
          </div>
          <p>{profile.data.description}</p>
          <p>{profile.data.owner.email}</p>
          <p>{profile.data.owner.username}</p>
          <p>{profile.data.owner.nickname}</p>
          {/*닉네임 없으면 만들라고 수정 창으로 보내야 함*/}
          <button>
            <Link href="/user/update">프로파일 수정</Link>
          </button>

          <br></br>
        </>
      ) : (
        <></>
      )}
      {cookie.userToken ? (
        <button onClick={logoutFunction}>logout 하는 버튼</button>
      ) : (
        <Link href="/login">login 해야지 후로파일이 보임</Link>
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
