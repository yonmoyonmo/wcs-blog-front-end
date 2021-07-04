import { endpointMania } from "../../../util/enpointMania";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Layout.module.css";

const updateNoti = ({ notification }) => {
  const [cookie, setCookie] = useCookies(["adminToken"]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const [notiId, setNotiId] = useState(0);
  const [currentNoti, setCurrentNoti] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  const [formTrigger, setFormTrigger] = useState(false);

  const updateNotiEndpoint = endpointMania("/admin/notification");

  useEffect(() => {
    if (cookie.adminToken) {
      setToken(cookie.adminToken);
    } else {
      router.push("/");
    }
  }, []);

  const updateNotification = async (e) => {
    e.preventDefault();
    const response = await fetch(updateNotiEndpoint, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: notiId,
        title: title,
        text: description,
      }),
    });
    const updateResult = await response.json();
    if (updateResult && updateResult.success) {
      window.location.reload();
    } else {
      setMessage("카테고리 수정 실패 사유 : " + updateResult.message);
    }
  };
  const deleteNotification = async (id) => {
    if (!notiId === id) {
      setMessage("오우?");
      return;
    }
    if (confirm("정말로 삭제입니까?")) {
      const response = await fetch(updateNotiEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const deleteResult = await response.json();
      if (deleteResult && deleteResult.success) {
        window.location.reload();
      } else {
        setMessage(deleteResult.message);
      }
    } else {
      return;
    }
  };

  return (
    <>
      {token ? (
        <>
          {message && <p style={{ color: "red" }}>{message}</p>}
          {formTrigger ? (
            <>
              <div className={styles.card}>
                <h4>{currentNoti}</h4>
                <p>{notiId}</p>
                <form onSubmit={updateNotification}>
                  <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                  <br></br>
                  <textarea
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  <input type="submit" value="반영하기" />
                </form>
              </div>
            </>
          ) : (
            <></>
          )}

          {notification.success ? (
            <div>
              {notification.data.map((noti) => {
                return (
                  <div key={noti.id} className={styles.card}>
                    <h2>{noti.title}</h2>
                    <p>{noti.text}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setNotiId(noti.id);
                        deleteNotification(noti.id);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFormTrigger(true);
                        setNotiId(noti.id);
                        setCurrentNoti(noti.title);
                        setTitle(noti.title);
                        setDescription(noti.text);
                      }}
                    >
                      수정
                    </button>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>???</p>
          )}
        </>
      ) : (
        <></>
      )}
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

export default updateNoti;
