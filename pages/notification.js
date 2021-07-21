import { endpointMania } from "../util/enpointMania";
import Header from "../components/Header";
import styles from "../styles/Layout.module.css";

const notificationPage = ({ notification }) => {
  return (
    <>
      <br />
      <div>
        {notification.success ? (
          <div>
            <div className={styles.grid}>
              {notification.data.map((noti) => {
                return (
                  <div style={{ margin: "1rem" }} key={noti.id}>
                    <div style={{ width: "300px" }} className="window">
                      <div className="title-bar">
                        <div className="title-bar-text">
                          <p>{noti.title}</p>
                        </div>
                        <div className="title-bar-controls">
                          <button aria-label="Minimize" />
                          <button aria-label="Maximize" />
                          <button aria-label="Close" />
                        </div>
                      </div>
                      <div className="window-body">
                        <div
                          className="field-row"
                          style={{ justifyContent: "center" }}
                        >
                          <p style={{ fontSize: "1.0rem" }}>{noti.title}</p>
                        </div>
                        <div
                          className="field-row"
                          style={{ justifyContent: "center" }}
                        >
                          <p>{noti.text}</p>
                        </div>
                        <div
                          className="field-row"
                          style={{ justifyContent: "center" }}
                        >
                          <p>{noti.createdTime.split("T")[0]}</p>
                        </div>
                      </div>
                      <br />
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
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
