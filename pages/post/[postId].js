import { useRouter } from "next/router";
import Image from "next/image";
import style from "../../styles/Layout.module.css";

const post = ({ post }) => {
  const router = useRouter();

  return (
    <>
      {post.data.images.map((image) => {
        return (
          <div key={image.id} className={style.imageContainer}>
            <Image src={image.imageURI} layout="fill" className={style.image}></Image>
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
            <p>{comment.text}</p>
          </div>
        );
      })}
    </>
  );
};

export async function getServerSideProps(context) {
  const { postId } = context.query;
  const postEndPoint = `http://localhost:8000/api/public/post/${postId}`;

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
