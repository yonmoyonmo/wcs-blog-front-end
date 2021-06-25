import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { endpointMania, imageEndpoint } from "../../../util/enpointMania";
import style from "../../../styles/Layout.module.css";

//닉네임 띄어쓰기 없게 하긔?

const profileUpdate = ({ profile }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [nickExists, setNickExists] = useState(false);

  const [nickError, setNickError] = useState("");
  const [nickInfo, setNickInfo] = useState("");

  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const nickNameCheckEndpoint = endpointMania("/api/user/nickname/check?nickname="); //get
  const updateProfileEndpoint = endpointMania("/api/user/profile"); //put
  const updateNickNameEndPoint = endpointMania("/api/user/nickname"); //post
  const updataProfileImageEndpoint = imageEndpoint("/wcs/image/upload"); //post, form-data

  useEffect(() => {
    if (profile.data.owner.nickname) {
      setNickname(profile.data.owner.nickname);
    }
    if (profile.data.description) {
      setDescription(profile.data.description);
    }
    if (profile.data.profileImageURL) {
      setProfileImageURL(profile.data.profileImageURL);
    }
  }, [profile]);

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

  async function submitProfile(e) {
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
        const body = new FormData();
        body.append("file", image);
        body.append("userName", nickname);
        const response = await fetch(updataProfileImageEndpoint, {
          method: "POST",
          body: body,
        });
        const dataImage = await response.json();
        if (dataImage && dataImage.imageLocation) {
          const imageURL = imageEndpoint(
            `/wcs/image/display${dataImage.imageLocation}`
          );
          console.log(imageURL);
          setProfileImageURL(imageURL);
          
          const response = await fetch(updateProfileEndpoint, {
            method: "PUT",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description,
              profileImageURL: imageURL
            }),
          });
          const data = await response.json();
          if (data && data.success) {
            console.log(data.message);
            router.push("/user/profile");
          } else {
            setSubmitError(data.message);
          }
        } else {
          setSubmitError(dataImage.message);
        }
      } else if (dataNick && !data.success) {
        setSubmitError(data.message);
      }
    }
  }

  const uploadPreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

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
        <div>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={createObjectURL ? createObjectURL : profileImageURL}
              layout="fill"
            ></img>
          </div>
          <h4>새 후로파일 사진</h4>
          <input type="file" onChange={uploadPreview} />
        </div>
        <input type="submit" value="프로필 수정"></input>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      </form>
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

export default profileUpdate;
