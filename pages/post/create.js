import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { endpointMania, imageEndpoint } from "../../util/enpointMania";
import jwtParser from "../../util/jwtParser";
import { useRouter } from "next/router";
import style from "../../styles/Layout.module.css";

const createPost = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const router = useRouter();
  const { cateId, name } = router.query;
  const back = `/postlist/${cateId}?name=${name}`;

  // "categoryId":1,
  // "title": "test post 01",
  // "text" : "this test is post creation test",
  // "tagList" : ["침착맨", "침착맨2"],
  // "imageUrlList" : ["이미지유알엘", "이미지유알엘투"]

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagString, setTagString] = useState("");

  const [tagList, setTagList] = useState([""]);
  const [imageUrlList, setImageUrlList] = useState([""]);

  const [error, setError] = useState("");

  const [images, setImages] = useState([]);
  const [createObjectURLs, setCreateObjectURLs] = useState([]);

  const postUploadEndpoint = endpointMania("/api/post"); // post with token
  const imageUploadEndpoint = imageEndpoint("/wcs/image/upload"); //post, form-data
  useEffect(() => {
    if (!token) {
      window.alert("권한 없음");
      router.push(back);
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    if(title === "" || text === ""){
      setError("제목과 내용 중 하나가 아무튼 없음");
    }else{
      //이미지 업로드 각각 하고 유알엘 받아서 포스트 업로드, 태그 배열로 바꾸는 함수 -> 해야함
      //일단 한 숨 잔다.
    }
  }

  const uploadPreviews = (e) => {
    if (e.target.files) {
      let size = e.target.files.length;
      for (let i = 0; i < size; i++) {
        setImages([...images, e.target.files[i]]);
        setCreateObjectURLs([
          ...createObjectURLs,
          URL.createObjectURL(e.target.files[i]),
        ]);
      }
    }
  };

  const resetImages = () => {
    setImages([]);
    setCreateObjectURLs([]);
    console.log(createObjectURLs);
    console.log(images);
  };

  return (
    <>
      <div>
        <p>{name} 아래에 글쓰기</p>
      </div>
      <h1>입력하는 곳</h1>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              maxLength="30"
              placeholder="제목 쓰는 곳"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <textarea
              type="text"
              value={text}
              placeholder="글 쓰는 부분"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
          </div>

          <div>
            <input
              type="text"
              maxLength="100"
              placeholder="태그 쓰는 곳 : , 로 구분하여 입력"
              value={tagString}
              onChange={(e) => {
                setTagString(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={resetImages}>image reset</button>
          {createObjectURLs.length !== 0 ? (
            createObjectURLs.map((each, key) => {
              console.log(createObjectURLs);
              console.log(images);
              return (
                <div className={style.imageContainer} key={key}>
                  <img className={style.image} src={each} layout="fill"></img>
                </div>
              );
            })
          ) : (
            <p>이미지 없음</p>
          )}

          <div>
            <input type="file" onChange={uploadPreviews} />
          </div>

          <input type="submit" value="글 등록"></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default createPost;
