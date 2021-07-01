import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { endpointMania, imageEndpoint } from "../../util/enpointMania";
import { useRouter } from "next/router";
import style from "../../styles/Layout.module.css";

const createPost = () => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const router = useRouter();
  const { cateId, name } = router.query;
  const back = `/postlist/${cateId}?name=${name}`;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagString, setTagString] = useState("");

  const [error, setError] = useState("");

  const [images, setImages] = useState([]);
  const [createObjectURLs, setCreateObjectURLs] = useState([]);

  const postUploadEndpoint = endpointMania("/api/post"); // post with token
  const imageUploadEndpoint = imageEndpoint("/wcs/image/post/upload"); //post, form-data

  useEffect(() => {
    if (!token) {
      window.alert("권한 없음");
      router.push(back);
    }
  }, []);

  const makeTagArray = (tagsWithComma) => {
    const tagArray = tagsWithComma.split(",");
    return tagArray;
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const makeImageUrls = (imageLocations) => {
    const imageURLs = [];
    imageLocations.map((imageLocation) => {
      const imageURL = imageEndpoint(`/wcs/image/display${imageLocation}`);
      imageURLs.push(imageURL);
    });
    return imageURLs;
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (title === "" || text === "" || images.length === 0) {
      setError("제목과 내용과 이미지 중 하나가 아무튼 없음");
    } else {
      const bodyFormData = new FormData();
      for (let i = 0; i < images.length; i++) {
        bodyFormData.append(`files`, images[i]);
      }
      const postName = makeid(title.length);
      bodyFormData.append("postName", postName);
      const response = await fetch(imageUploadEndpoint, {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: bodyFormData,
      });
      const imageData = await response.json();
      if (imageData && imageData.success) {
        const imageURLs = makeImageUrls(imageData.imageLocations);
        const tags = makeTagArray(tagString);

        const response2 = await fetch(postUploadEndpoint, {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: cateId,
            title: title,
            text: text,
            tagList: tags,
            imageUrlList: imageURLs,
          }),
        });
        const postData = await response2.json();
        if (postData && postData.success) {
          router.push(back);
        } else {
          setError(postData.message);
        }
      } else {
        setError(imageData.message);
      }
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
              maxLength="3000"
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
