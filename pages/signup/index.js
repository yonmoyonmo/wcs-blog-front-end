import style from "../../styles/Layout.module.css";
import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { authEndpoint } from "../../util/enpointMania";

const signup = () => {
  const [loginError, setLoginError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupEndPoint = authEndpoint("/auth/signup");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(signupEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if ((data && data.success === false) || data.error) {
          setLoginError(data.message);
          console.log(data.error);
        }
        if (data && data.success) {
          Router.push("/login");
        }
      });
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <form onSubmit={handleSubmit}>
            <p>이메일로 회원가입</p>
            <input
              name="name"
              type="name"
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <input type="submit" value="submit" />
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
