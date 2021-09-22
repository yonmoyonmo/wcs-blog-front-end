import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { endpointMania } from "../../../util/enpointMania";
import Loading from "../../../components/Loading";
import style from "../../../styles/Layout.module.css";

const commentCreate = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const { postId, catename, cateid, page } = router.query;

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const back = `/post/${postId}?catename=${catename}&cateid=${cateid}&page=${page}`;

  const commentUploadEndpoint = endpointMania("/api/comment"); // post with token

  useEffect(() => {
    if (!token) {
      window.alert("권한 없음, 로그인 하셈, my profile 눌러 보셈");
      router.push("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (text) {
      setLoading(true);
      const response = await fetch(commentUploadEndpoint, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          text: text,
        }),
      });
      const commentData = await response.json();
      if (commentData && commentData.success) {
        router.push(back);
      } else {
        setError("댓글 달기 실패!");
        if (commentData) {
          console.log(commentData.message);
        }
      }
    } else {
      setError("댓글 내용이 없읍니다.");
    }
  };

  return (
    <div className="window" style={{ width: "50vw" }}>
      <div className="title-bar">
        <div className="title-bar-text">댓글 달기</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        {loading ? (
          <Loading></Loading>
        ) : (
          <div>
            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <textarea
                style={{
                  width: "100%",
                  fontSize: "1rem",
                  lineHeight: "1.4em",
                  marginBottom: "1rem",
                }}
                type="text"
                maxLength="140"
                placeholder="댓글 쓰는 곳, 140자 제한임"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              ></textarea>
              <input type="submit" value="댓글 등록"></input>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default commentCreate;
