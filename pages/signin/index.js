import style from "../../styles/Layout.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { authEndpoint } from "../../util/enpointMania";
import googleLogo from "../../assets/googleLogo.png";

const login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["userToken"]);
  const router = useRouter();

  const oauth2EndPoint = authEndpoint(
    "/oauth2/authorize/google?redirect_uri=https://wonmocyberschool.com/oauth/redirect"
  );
  // const oauth2EndPoint = authEndpoint(
  //   "/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/redirect"
  // );
  const loginEndPoint = authEndpoint("/auth/login");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(loginEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        try {
          return r.json();
        } catch (e) {
          console.log(e);
          setLoginError("실패!");
        }
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.accessToken) {
          setCookie("userToken", data.accessToken, {
            maxAge: 360000,
            path: "/",
          });
          router.push("/");
        } else {
          window.alert("계정 정보가 올바르지 않습니다.");
        }
      });
  }

  return (
    <div className="window-body">
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Login</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <p style={{ textAlign: "center" }}>normal login with ID/PASSWORD</p>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input
                name="email"
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input
                name="password"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input type="submit" value="login" />
            </div>
            <hr />
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p>계정이 없다면 간단히 등록할 수 있음</p>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/signup");
                }}
              >
                <Link href="/signup">회원가입</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">OAuth 2.0</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p style={{ textAlign: "center" }}>
              social login with a google account
            </p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(oauth2EndPoint);
              }}
            >
              <Link href={oauth2EndPoint}>Login With Google</Link>
            </button>
          </div>
          <div
            className="field-row"
            style={{ justifyContent: "center", padding: "5%" }}
          >
            <img src={googleLogo}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
