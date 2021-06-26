import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { endpointMania, imageEndpoint } from "../../../util/enpointMania";
import Link from "next/link"
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

  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const updateProfileEndpoint = endpointMania("/api/user/profile"); //put
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

  async function submitProfile(e) {
    e.preventDefault();

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
          profileImageURL: imageURL,
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
      <p>{nickname}</p>
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
      <Link href="/user/nickname">닉네임 수정 도전하기</Link>
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
