import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";

const post = ({ post }) => {
  const router = useRouter();

  return (
    <>
      {post.success ? (
        <div>
          <h1>{post.data.title}</h1>
          <p>{post.data.text}</p>
        </div>
      ) : (
        <div>no post</div>
      )}
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
