import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { endpointMania, imageEndpoint } from "../../../util/enpointMania";
import style from "../../../styles/Layout.module.css";
import Loading from "../../../components/Loading";

const profileUpdate = ({ profile }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [submitError, setSubmitError] = useState("");

  const [loading, setLoading] = useState("");

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
    if (image) {
      setLoading(true);
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
          console.log("시발");
          router.push("/user/profile");
        } else {
          setSubmitError("profile update error");
        }
      } else {
        setSubmitError("image update error : profile");
      }
    } else {
      setLoading(true);
      const notChangedImage = profile.data.profileImageURL;
      const response = await fetch(updateProfileEndpoint, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          profileImageURL: notChangedImage,
        }),
      });
      const data = await response.json();
      if (data && data.success) {
        console.log(data.message);
        router.push("/user/profile");
      } else {
        setSubmitError("프로파일 수정 실패");
        if (data) {
          console.log(data.message);
        }
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
    <div className="window" style={{ width: "100%" }}>
      <div className="title-bar">
        <div className="title-bar-text">프로필 수정</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        {loading ? (
          <>
            <Loading></Loading>
            {submitError && <p style={{ color: "red" }}>{submitError}</p>}
          </>
        ) : (
          <div>
            <div>
              <div>
                <p>닉네임 : {nickname}</p>
                <br />
              </div>
              <form onSubmit={submitProfile} style={{ width: "100%" }}>
                <div>
                  <textarea
                    style={{
                      width: "100%",
                      fontSize: "1rem",
                      lineHeight: "1.4em",
                      marginBottom: "1rem",
                    }}
                    type="text"
                    value={description}
                    placeholder="간단 소개"
                    maxLength="1000"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <br />
                <div style={{ width: "300px" }}>
                  <div className={style.imageContainer}>
                    <img
                      className={style.image}
                      src={createObjectURL ? createObjectURL : profileImageURL}
                      layout="fill"
                    ></img>
                  </div>
                </div>
                <div style={{ margin: "1rem" }}>
                  <input type="file" onChange={uploadPreview} />
                </div>
                <br />
                <div>
                  <input type="submit" value="프로필 수정"></input>
                </div>
                {submitError && <p style={{ color: "red" }}>{submitError}</p>}
              </form>
              <br />
              <br />
              <br />
              <div>
                <a style={{ color: "blue" }} href="/user/nickname">
                  닉네임 수정 도전하기
                </a>
              </div>
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const tokenFromCookie = (cookie) => {
  if (!cookie) {
    return "";
  } else {
    const parsedCookie = cookie.split("userToken=");
    console.log(parsedCookie);
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
