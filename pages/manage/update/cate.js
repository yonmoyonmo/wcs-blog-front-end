import { endpointMania } from "../../../util/enpointMania";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Layout.module.css";

const updateCate = ({ categories }) => {
  const [cookie, setCookie] = useCookies(["adminToken"]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const [cateId, setCateId] = useState(0);
  const [currentCate, setCurrentCate] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  const [formTrigger, setFormTrigger] = useState(false);

  const updateCateEndpoint = endpointMania("/admin/category");

  useEffect(() => {
    if (cookie.adminToken) {
      setToken(cookie.adminToken);
    } else {
      router.push("/");
    }
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(updateCateEndpoint, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cateId,
        title: title,
        description: description,
      }),
    });
    const updateResult = await response.json();
    if (updateResult && updateResult.success) {
      window.location.reload();
    } else {
      setMessage("카테고리 수정 실패 사유 : " + updateResult.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!cateId === id) {
      setMessage("오우?");
      return;
    }
    if (confirm("정말로 삭제입니까? 관련 게시물 싸그리 지웁니다?")) {
      const response = await fetch(updateCateEndpoint, {
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
        setMessage("조땜");
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
                <h4>{currentCate}</h4>
                <p>{cateId}</p>
                <form onSubmit={updateCategory}>
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
          
          {categories.success ? (
            <div>
              {categories.data.map((cate) => {
                return (
                  <div key={cate.id} className={styles.card}>
                    <h2>{cate.title}</h2>
                    <p>{cate.description}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setCateId(cate.id);
                        deleteCategory(cate.id);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFormTrigger(true);
                        setCateId(cate.id);
                        setCurrentCate(cate.title);
                        setTitle(cate.title);
                        setDescription(cate.description);
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
    const res = await fetch(endpointMania("/admin/public/category/list"), {
      method: "GET",
    });
    const categories = await res.json();
    return {
      props: {
        categories,
      },
    };
  } catch (e) {
    console.log(e);
    const categories = { success: false };
    return { props: { categories } };
  }
}

export default updateCate;
