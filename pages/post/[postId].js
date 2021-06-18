import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import jwtParser from "../../util/jwtParser";
import { endpointMania } from "../../util/enpointMania";
import Image from "next/image";
import style from "../../styles/Layout.module.css";

const post = ({ post }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const emailOfThisPost = post.data.blogUser.email;
  const currentEmail = jwtParser(token);

  return (
    <>
      {emailOfThisPost === currentEmail ? (
        <p>수정과 삭제가 모습을 드러냈다.</p>
      ) : (
        <></>
      )}

      {post.data.images.map((image) => {
        return (
          <div key={image.id} className={style.imageContainer}>
            <Image
              src={image.imageURI}
              layout="fill"
              className={style.image}
            ></Image>
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
      {post.data.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <hr />
            <p>{comment.text}</p>
          </div>
        );
      })}
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
