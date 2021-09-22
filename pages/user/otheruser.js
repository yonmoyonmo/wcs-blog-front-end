import Link from "next/link";
import { useRouter } from "next/router";
import { endpointMania } from "../../util/enpointMania";
import defaultProfile from "../../assets/IMG_20200223_160143.jpg";
import style from "../../styles/Layout.module.css";

const otherUserProfile = ({ profile }) => {
  const router = useRouter();

  return (
    <div className="window" style={{ width: "100%" }}>
      <div className="title-bar">
        <div className="title-bar-text">
          {profile.data.userProfile.owner.nickname}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      {profile.success ? (
        <div className="window-body">
          <div style={{ width: "300px" }}>
            <div
              key={profile.data.userProfile.id}
              className={style.imageContainer}
            >
              <img
                src={
                  profile.data.userProfile.profileImageURL
                    ? profile.data.userProfile.profileImageURL
                    : defaultProfile
                }
                layout="fill"
                className={style.image}
              ></img>
            </div>
          </div>

          <div style={{ margin: "1rem" }}>
            <p>{profile.data.userProfile.owner.nickname}</p>
          </div>
          <div style={{ margin: "1rem" }}>
            <p>{profile.data.userProfile.description}</p>
          </div>
          <br />
        </div>
      ) : (
        <>오잉? 실패했네? ㅋㄷㅋㄷ</>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { nickname } = context.query;
  const encodedNickname = encodeURI(nickname);
  const otheruserProfileEndpoint = endpointMania(
    `/api/public/user/profile?nickname=${encodedNickname}`
  );

  try {
    const res = await fetch(otheruserProfileEndpoint, {
      method: "GET",
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

export default otherUserProfile;
