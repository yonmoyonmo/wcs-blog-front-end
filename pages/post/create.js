import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { endpointMania } from "../../util/enpointMania";
import jwtParser from "../../util/jwtParser";
import { useRouter } from "next/router";

const createPost = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const router = useRouter();
  const { cateId, name } = router.query;
  const back = `/postlist/${cateId}?name=${name}`;
  useEffect(() => {
    if (!token) {
      window.alert("권한 없음");
      router.push(back);
    }
  }, []);

  return (
    <div>
      <p>createPost as a child of {cateId}</p>
    </div>
  );
};

export default createPost;
