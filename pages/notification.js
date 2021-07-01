import { endpointMania } from "../util/enpointMania";
import Header from "../components/Header";
import styles from "../styles/Layout.module.css";

const notificationPage = ({ notification }) => {
  return (
    <>
    <Header props={"Notification"}></Header>
    <div>
      {notification.success ? (
        <div>
          {notification.data.map((noti) => {
            return (
              <div className={styles.card}>
                <h2>{noti.title}</h2>
                <p>{noti.text}</p>
                <p>{noti.createdTime.split('T')[0]}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>공지사항 없음</p>
      )}
    </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(endpointMania("/admin/public/notification/list"), {
      method: "GET",
    });
    const notification = await res.json();
    return {
      props: {
        notification,
      },
    };
  } catch (e) {
    console.log(e);
    const notification = { success: false };
    return { props: { notification } };
  }
}

export default notificationPage;
