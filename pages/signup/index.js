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

  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

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
          Router.push("/signin");
        } else {
          setLoginError("이미 등록된 이메일입니다.");
        }
      });
  }

  return (
    <>
      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">
            <p>sign up</p>
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>원모 싸이버 간단한 회원가입</p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>
              가입 하시게 되면 이메일이 저의 데이타 베이쓰에 저장되는 것에
              동의하신 것으로 여기겠읍니다.
            </p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>저장된 이메일은 맹세코!! 회원 구별에만 쓰겠읍니다.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input
                style={{ width: "80%" }}
                name="name"
                type="name"
                value={name}
                placeholder="name"
                onChange={(e) => {
                  if (regExp.test(e.target.value)) {
                    setLoginError("이름에 특수문자 포함 불가능");
                    setName(e.target.value.replace(regExp, ""));
                    return;
                  }
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input
                style={{ width: "80%" }}
                name="email"
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input
                style={{ width: "80%" }}
                name="password"
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <input type="submit" value="sign up" />
            </div>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
