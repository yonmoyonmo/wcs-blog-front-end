import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { endpointMania } from "../../../util/enpointMania";
import jwtParser from "../../../util/jwtParser";
import { useRouter } from "next/router";

const createPost = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;

  const router = useRouter();

  if(!token){
    window.alert("로그인 필요함");
    router.push("/");
  }

  return (
    <div>
      <p>createPost</p>
    </div>
  );
};

export default createPost;
