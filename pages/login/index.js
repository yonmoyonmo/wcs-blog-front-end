import style from "../../styles/Layout.module.css";
import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { useCookies } from "react-cookie";

const login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["userToken"]);

  const oauth2EndPoint =
    "http://localhost:7000/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth/redirect";

  const loginEndPoint = "http://localhost:7000/auth/login";

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
        console.log(r);
        return r.json();
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
          Router.push("/");
        }
      });
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <form onSubmit={handleSubmit}>
          <p>그냥 Login</p>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" />
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <button>
            <Link href="/signup">sign up</Link>
          </button>
        </form>
      </div>

      <div className={style.card}>
        <div>
          <h2>소셜 로그인</h2>
          <p>
            <Link href={oauth2EndPoint}>oauth 2.0 google test</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
