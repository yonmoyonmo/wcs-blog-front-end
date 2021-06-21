import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { endpointMania } from "../../../util/enpointMania";
import jwtParser from "../../../util/jwtParser";

const updatePost = ({ post }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const router = useRouter();
  const [emailOfThisPost, setEmailOfThisPost] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  useEffect(() => {
    if (post.success) {
      setEmailOfThisPost(post.data.blogUser.email);
    }
    setCurrentEmail(jwtParser(token));
  }, [post]);

  if(emailOfThisPost !== currentEmail){
    window.alert("권한 없음")
    router.push("/");
}

  return (
    <div>
      <p>{post.data.id}</p>
      <p>{currentEmail}</p>
      <p>{emailOfThisPost}</p>
    </div>
  );
};

const tokenFromCookie = (cookie) => {
  if (!cookie) {
    return "";
  } else {
    const parsedCookie = cookie.split("=");
    return parsedCookie[1];
  }
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

export default updatePost;
