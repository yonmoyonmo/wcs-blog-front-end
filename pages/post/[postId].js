import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import jwtParser from "../../util/jwtParser";
import { endpointMania } from "../../util/enpointMania";
import Link from "next/link";
import style from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import Comment from "../../components/Comment";

const post = ({ post }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const router = useRouter();

  const [emailOfThisPost, setEmailOfThisPost] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [postId, setPostId] = useState("");
  const [splitedText, setSplitedTest] = useState([]);

  const deleteEndpoint = endpointMania("/api/post"); //delete with post id and token

  const textSpliter = (text) => {
    const splitedText = text.split("\n");
    setSplitedTest(splitedText);
  };

  useEffect(() => {
    if (post.success) {
      setEmailOfThisPost(post.data.blogUser.email);
      setPostId(post.data.id);
      textSpliter(post.data.text);
    }
    setCurrentEmail(jwtParser(token));
  }, [post]);

  const deleteFunction = async (e) => {
    e.preventDefault();
    if (confirm("진짜진짜 삭제원하시나요???!")) {
      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
        }),
      });
      const deleteData = await response.json();
      if (deleteData && deleteData.success) {
        router.push("/");
      } else {
        window.alert(`삭제 요청 실패! : ${deleteData.message}`);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      {post.success ? (
        <>
          <div style={{ width: "100%" }} className="window">
            <div className="title-bar">
              <div className="title-bar-text">{post.data.title}</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" />
                <button aria-label="Maximize" />
                <button aria-label="Close" />
              </div>
            </div>

            {emailOfThisPost === currentEmail ? (
              <>
                <br />
                <div className="field-row" style={{ justifyContent: "center" }}>
                  <button>
                    <Link href={`/post/update/${post.data.id}`}>
                      게시글 수정
                    </Link>
                  </button>
                  <button onClick={deleteFunction}>게시글 삭제</button>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p>글쓴이 : {post.data.blogUser.nickname}</p>
            </div>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p>작성일 : {post.data.createdTime.split("T")[0]}</p>
            </div>
            {post.data.images.map((image) => {
              return (
                <div className="window-body">
                  <div
                    className="field-row"
                    style={{ justifyContent: "center" }}
                  >
                    <div key={image.id} className={style.imageContainer}>
                      <img
                        src={image.imageURI}
                        layout="fill"
                        className={style.image}
                      ></img>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
            {post.success ? (
              <>
                <div className="window-body">
                  <div
                    className="field-row"
                    style={{ justifyContent: "center" }}
                  >
                    <p style={{ fontSize: "1.0rem" }}>{post.data.title}</p>
                  </div>
                  <div
                    className="field-row"
                    style={{ justifyContent: "center" }}
                  >
                    {splitedText.map((each) => {
                      return (
                        <>
                          {each}
                          <br />
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div>no post</div>
            )}
            <hr />
            <div className="field-row" style={{ justifyContent: "center" }}>
              <p>tags</p>
            </div>
            {post.data.postTagRelations ? (
              post.data.postTagRelations.map((postTagRelation) => {
                return (
                  <div
                    className="field-row"
                    style={{ justifyContent: "center" }}
                  >
                    <div key={postTagRelation.tag.id}>
                      <Link href={`/postlist/tag/${postTagRelation.tag.id}`}>
                        <a style={{ color: "blue" }}>
                          {postTagRelation.tag.tagName}
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <hr />
            <div className="window-body">
              <div className="field-row" style={{ justifyContent: "center" }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/post/comment/create?postId=${post.data.id}`);
                  }}
                >
                  <Link href={`/post/comment/create?postId=${post.data.id}`}>
                    댓글달기
                  </Link>
                </button>
              </div>
            </div>

            {post.data.comments ? (
              post.data.comments.map((comment) => {
                return (
                  <Comment
                    comment={comment}
                    key={comment.id}
                    currentEmail={currentEmail}
                    token={token}
                  ></Comment>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div>
          <p>404</p>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { postId } = context.query;
  const postEndPoint = endpointMania(`/api/public/post/${postId}`);

  try {
    const res = await fetch(postEndPoint, {
      method: "GET",
    });
    const post = await res.json();
    return {
      props: {
        post,
      },
    };
  } catch (e) {
    console.log(e);
    const post = { success: false };
    return { props: { post } };
  }
}

export default post;
