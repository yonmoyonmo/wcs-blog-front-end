import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { endpointMania } from "../../util/enpointMania";

const setProfileNickname = () => {
  const [nickname, setNickname] = useState("");
  const [nickExists, setNickExists] = useState(false);
  const [nickError, setNickError] = useState("");
  const [nickInfo, setNickInfo] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  const router = useRouter();

  const nickNameCheckEndpoint = endpointMania(
    "/api/user/nickname/check?nickname="
  );
  const updateNickNameEndPoint = endpointMania("/api/user/nickname");

  function nicknameDubCheck(e) {
    e.preventDefault();

    fetch(nickNameCheckEndpoint + nickname, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.success) {
          setNickInfo(data.message);
          setNickExists(true);
        } else if (data && !data.success) {
          setNickError(data.message);
        }
      });
  }
  async function submitNickname(e) {
    e.preventDefault();
    if (!nickExists) {
      setSubmitError("닉네임 중복검사좀 해주셈");
    } else {
      const response = await fetch(updateNickNameEndPoint, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: nickname,
      });
      const dataNick = await response.json();
      if (dataNick && dataNick.success) {
        console.log(dataNick.message);
        router.push("/user/profile");
      } else {
        setNickError(dataNick.message);
      }
    }
  }

  return (
    <div>
      닉네임을 잘 짓자
      <button onClick={nicknameDubCheck}> 중복확인</button>
      {nickError && <p style={{ color: "red" }}>{nickError}</p>}
      {nickInfo && <p style={{ color: "blue" }}>{nickInfo}</p>}
      {submitError && <p style={{ color: "blue" }}>{submitError}</p>}
      <form onSubmit={submitNickname}>
        <input
          type="text"
          maxLength="12"
          placeholder="set a nickname"
          value={nickname}
          onChange={(e) => {
            if(regExp.test(e.target.value)){
              setNickError("이름에 특수문자 포함 불가능");
              setNickname(e.target.value.replace(regExp, ""));
              return;
            }
            setNickname(e.target.value);
          }}
        ></input>
        <input type="submit" value="닉네임 등록"></input>
      </form>
    </div>
  );
};
export default setProfileNickname;
