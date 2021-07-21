import Link from "next/link";
import { endpointMania } from "../util/enpointMania";
import { useEffect } from "react";
import React, { useState } from "react";

const Comment = ({ comment, currentEmail, token, key }) => {
  const commentDeleteEndpoint = endpointMania("/api/comment");
  const [nick, setNick] = useState("");

  useEffect(() => {
    setNick(nickCheck(comment.blogUser.nickname));
  }, []);

  const nickCheck = (nick) => {
    if (!nick) return comment.blogUser.email;
    else return nick;
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    if (confirm("진짜진짜 삭제원하시나요???!")) {
      const response = await fetch(commentDeleteEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: comment.id,
        }),
      });
      const deleteData = await response.json();
      if (deleteData && deleteData.success) {
        window.location.reload();
      } else {
        window.alert(`삭제 요청 실패! : ${deleteData.message}`);
      }
    } else {
      return;
    }
  };

  return (
    <div key={key}>
      <div>{nick}</div>
      <div>
        <p>{comment.text}</p>
      </div>
      <div>
        <p>{"[" + comment.createdTime.split("T")[0] + "]"}</p>
      </div>
      {comment.blogUser.email === currentEmail ? (
        <div>
          <button onClick={deleteComment}>삭제</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
