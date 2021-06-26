import Link from "next/link";
import { endpointMania } from "../util/enpointMania";

const Comment = ({ comment, currentEmail, token, key }) => {
  const commentDeleteEndpoint = endpointMania("/api/comment");

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
      <hr />
      <p>
        {comment.blogUser.nickname +
          " : " +
          comment.text +
          " [" +
          comment.createdTime.split("T")[0] +
          "]"}
      </p>
      {comment.blogUser.email === currentEmail ? (
        <button onClick={deleteComment}>삭제</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
