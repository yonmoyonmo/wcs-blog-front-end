import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { endpointMania } from "../../../util/enpointMania";

const profileUpdate = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");

  const [nickExists, setNickExists] = useState(false);

  const [nickError, setNickError] = useState("");
  const [nickInfo, setNickInfo] = useState("");

  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const nickNameCheckEndpoint = endpointMania(
    "/api/user/nickname/check?nickname="
  ); //get
  const updateProfileEndpoint = endpointMania("/api/user/profile"); //put
  const updateNickNameEndPoint = endpointMania("/api/user/nickname"); //post

  const profileImageURL =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2IM7Y%2Fbtq7fc6VwX6%2FKirmwkBZWCoERSvkIvBqk1%2Fimg.jpg";

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

  function submitProfile(e) {
    e.preventDefault();
    if (!nickExists) {
      setSubmitError("닉네임 중복검사좀 해주셈");
    } else {
      fetch(updateNickNameEndPoint, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: nickname,
      })
        .then((r) => {
          return r.json();
        })
        .then((data) => {
          if (data && data.success) {
            fetch(updateProfileEndpoint, {
              method: "PUT",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                description,
                profileImageURL,
              }),
            })
              .then((r) => {
                return r.json();
              })
              .then((data) => {
                if (data && data.success) {
                  console.log(data.message);
                  router.push("/user/profile");
                } else {
                  setSubmitError(data.message);
                }
              });
          } else if (data && !data.success) {
            setSubmitError(data.message);
          }
        });
    }
  }

  return (
    <div>
      update profile
      <form onSubmit={nicknameDubCheck}>
        <input
          type="text"
          maxLength="12"
          placeholder="set a nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></input>
        <input type="submit" value="닉네임 중복 확인"></input>
        {nickError && <p style={{ color: "red" }}>{nickError}</p>}
        {nickInfo && <p style={{ color: "blue" }}>{nickInfo}</p>}
      </form>
      <form onSubmit={submitProfile}>
        <textarea
          type="text"
          value={description}
          placeholder="간단 소개"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <input type="submit" value="프로필 수정"></input>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      </form>
    </div>
  );
};

export default profileUpdate;
