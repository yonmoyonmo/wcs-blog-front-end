import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import jwtParser from "../../util/jwtParser";
import { endpointMania } from "../../util/enpointMania";
import Link from "next/link";
import style from "../../styles/Layout.module.css";
import { useRouter } from "next/router";

const post = ({ post }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const router = useRouter();

  const [emailOfThisPost, setEmailOfThisPost] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [postId, setPostId] = useState("");

  const deleteEndpoint = endpointMania("/api/post"); //delete with post id and token

  useEffect(() => {
    if (post.success) {
      setEmailOfThisPost(post.data.blogUser.email);
      setPostId(post.data.id);
    }
    setCurrentEmail(jwtParser(token));
  }, [post]);

  const deleteFunction = async (e) =>{
    e.preventDefault();
    if(confirm("진짜진짜 삭제원하시나요???!")){
      const response = await fetch(
        deleteEndpoint, {
          method:"DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: postId,
          }),
        }
      );
      const deleteData = await response.json();
      if(deleteData && deleteData.success){
        router.push("/");
      }else{
        window.alert(`삭제 요청 실패! : ${deleteData.message}`);
      }
    }else{
      return;
    }
  }

  return (
    <>
      {post.success ? (
        <>
          {emailOfThisPost === currentEmail ? (
            <div>
              <p>주인만 볼 수 있는 부분</p>
              <button>
                <Link href={`/post/update/${post.data.id}`}>게시글 수정</Link>
              </button>
              <button onClick={deleteFunction}>
                게시글 삭제
              </button>
            </div>
          ) : (
            <></>
          )}
          <p>{emailOfThisPost}</p>
          <p>{post.data.createdTime.split("T")[0]}</p>
          {post.data.images.map((image) => {
            return (
              <div key={image.id} className={style.imageContainer}>
                <img
                  src={image.imageURI}
                  layout="fill"
                  className={style.image}
                ></img>
              </div>
            );
          })}
          {post.success ? (
            <div>
              <h1>{post.data.title}</h1>
              <p>{post.data.text}</p>
            </div>
          ) : (
            <div>no post</div>
          )}
          {post.data.postTagRelations ? (
            post.data.postTagRelations.map((postTagRelation) => {
              return (
                <div key={postTagRelation.tag.id}>
                  <Link href={`/postlist/tag/${postTagRelation.tag.id}`}>
                    {postTagRelation.tag.tagName}
                  </Link>
                </div>
              );
            })
          ) : (
            <></>
          )}
          {post.data.comments ? (
            post.data.comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <hr />
                  <p>{comment.text}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>
          <p>404</p>
        </div>
      )}
    </>
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
