import { useCookies } from "react-cookie";
import { endpointMania } from "../../util/enpointMania";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";

const adminHome = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["adminToken"]);
  const router = useRouter();

  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [errorString, setErrorString] = useState("");

  const [category, setCategory] = useState("");
  const [cateDesc, setCateDesc] = useState("");

  const [notification, setNotification] = useState("");
  const [notiText, setNotiText] = useState("");

  const tokenEndpoint = endpointMania("/admin/wonmo/login");
  const cateEndpoint = endpointMania("/admin/category");
  const notiEndpoint = endpointMania("/admin/notification");

  useEffect(() => {
    if (cookie.adminToken) {
      setToken(cookie.adminToken);
    }
  }, []);

  const logoutFunction = (e) => {
    e.preventDefault();
    try {
      removeCookie("adminToken");
      window.location.reload();
    } catch (e) {
      window.alert(`logout 실패 : ${e}`);
    }
    router.push("/admin");
  };

  const getAdminToken = async (e) => {
    e.preventDefault();
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wonmo: email,
        wonmokey: password,
      }),
    });
    const adminTokenData = await response.json();
    if (adminTokenData && adminTokenData.success) {
      setCookie("adminToken", adminTokenData.data, {
        path: "/",
        maxAge: 360000,
      });
      window.location.reload();
    } else {
      setLoginError("뭔가 잘못됨");
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(cateEndpoint, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: category,
        description: cateDesc,
      }),
    });
    const cateData = await response.json();
    if (cateData && cateData.success) {
      setErrorString("카테고리 생성됨");
    } else {
      setErrorString("카테고리 안생성됨");
    }
  };

  const createNotification = async (e) => {
    e.preventDefault();
    const response = await fetch(notiEndpoint, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: notification,
        text: notiText,
      }),
    });
    const notiData = await response.json();
    if (notiData && notiData.success) {
      setErrorString("공지 생성됨");
    } else {
      setErrorString("공지 안생성됨");
    }
  };

  return (
    <>
      {token ? (
        <div>
          {errorString && <p style={{ color: "red" }}>{errorString}</p>}
          <div>
            <p>어드민 로그인 됨</p>
            <button onClick={logoutFunction}>로그아웃</button>
          </div>
          <hr />
          <div>
            <label>카테고리 만들기</label>
            <form onSubmit={createCategory}>
              <input
                type="text"
                value={category}
                placeholder="category title"
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="text"
                value={cateDesc}
                placeholder="category description"
                onChange={(e) => setCateDesc(e.target.value)}
              />
              <input type="submit" value="등록" />
            </form>

            <button>
              <Link href="/manage/update/cate">카테고리 수정하러 가기</Link>
            </button>
          </div>

          <hr />
          <div>
            <label>공지사항 만들기</label>
            <form onSubmit={createNotification}>
              <input
                type="text"
                value={notification}
                placeholder="noti title"
                onChange={(e) => setNotification(e.target.value)}
              />
              <textarea
                type="text"
                value={notiText}
                placeholder="noti description"
                onChange={(e) => setNotiText(e.target.value)}
              />
              <input type="submit" value="등록" />
            </form>

            <button>
              <Link href="/manage/update/noti">공지사항 수정하러 가기</Link>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>admin home</p>
          <hr />
          <form onSubmit={getAdminToken}>
            <input
              type="text"
              value={email}
              placeholder="admin account"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="login" />
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </form>
        </div>
      )}
    </>
  );
};
export default adminHome;
