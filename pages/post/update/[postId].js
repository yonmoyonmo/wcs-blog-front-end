import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { endpointMania, imageEndpoint } from "../../../util/enpointMania";
import jwtParser from "../../../util/jwtParser";
import style from "../../../styles/Layout.module.css";
import Loading from "../../../components/Loading";

const updatePost = ({ post }) => {
  const [cookie, setCookie] = useCookies(["userToken"]);
  const token = cookie.userToken;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { postId, catename, cateid, page } = router.query;

  const back = `/post/${[
    postId,
  ]}?catename=${catename}&cateid=${cateid}&page=${page}`;

  const [emailOfThisPost, setEmailOfThisPost] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagString, setTagString] = useState("");

  const [postImageURLs, setPostImageURLs] = useState([""]);

  const [error, setError] = useState("");

  const [images, setImages] = useState([]);
  const [createObjectURLs, setCreateObjectURLs] = useState([]);

  const postUpdateEndpoint = endpointMania("/api/post"); // put with token
  const imageUploadEndpoint = imageEndpoint("/wcs/image/post/upload"); //post, form-data
  //----------------------------------------------------------
  const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  useEffect(() => {
    if (post.success) {
      setEmailOfThisPost(post.data.blogUser.email);
    }
    if (post.data.title) {
      setTitle(post.data.title);
    }
    if (post.data.text) {
      setText(post.data.text);
    }
    if (post.data.postTagRelations.length !== 0) {
      let tagArray = [];
      post.data.postTagRelations.map((ptr) => {
        tagArray.push(ptr.tag.tagName);
      });
      setTagString(tagArray.join());
    }
    if (post.data.images.length !== 0) {
      let urls = [];
      post.data.images.map((image) => {
        urls.push(image.imageURI);
      });
      setPostImageURLs(urls);
    }

    setCurrentEmail(jwtParser(token));
  }, [post]);
  //----------------------------------------------------------
  if (emailOfThisPost !== currentEmail) {
    window.alert("권한 없음");
    router.push("/");
  }
  //----------------------------------------------------------
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
  //------------------------------------------------------------
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

  // const resetImages = () => {
  //   setImages([]);
  //   setCreateObjectURLs([]);
  // };
  //---------------------------------------------------------------
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (images.length !== 0) {
      //새 이미지 등록되는 경우
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

        const response3 = await fetch(postUpdateEndpoint, {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: postId,
            title: title,
            text: text,
            tagList: tags,
            imageUrlList: imageURLs,
          }),
        });
        const postUpdateData = await response3.json();
        if (postUpdateData && postUpdateData.success) {
          router.push(back);
        } else {
          setError(postUpdateData.message);
        }
      } else {
        setError(imageData.message);
      }
    } else {
      //새 이미지 등록 없는 경우
      const tags = makeTagArray(tagString);
      const response2 = await fetch(postUpdateEndpoint, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
          title: title,
          text: text,
          tagList: tags,
          imageUrlList: postImageURLs,
        }),
      });
      const data2 = await response2.json();
      if (data2 && data2.success) {
        router.push(back);
      } else {
        setError(data2.message);
      }
    }
  };

  return (
    <div className="window" style={{ width: "70vw" }}>
      <div className="title-bar">
        <div className="title-bar-text">게시글 수정하기</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="window-body">
          <div>
            <div>
              <form onSubmit={submitHandler} style={{ margin: "10px" }}>
                <div>
                  <input
                    style={{
                      width: "100%",
                      fontSize: "1rem",
                      lineHeight: "1.4em",
                      marginBottom: "1rem",
                    }}
                    type="text"
                    maxLength="30"
                    placeholder="제목 쓰는 곳"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                </div>
                <br />
                <div>
                  <textarea
                    style={{
                      width: "100%",
                      fontSize: "1rem",
                      lineHeight: "1.4em",
                      marginBottom: "1rem",
                    }}
                    type="text"
                    value={text}
                    placeholder="글 쓰는 부분"
                    maxLength="3000"
                    rows="30"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  ></textarea>
                </div>
                <br />
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImages([]);
                      setCreateObjectURLs([]);
                    }}
                  >
                    image reset
                  </button>
                </div>
                <br />
                {createObjectURLs.length !== 0 ? (
                  createObjectURLs.map((each, key) => {
                    return (
                      <div
                        className="field-row"
                        style={{ justifyContent: "center" }}
                      >
                        <div className={style.imageContainer} key={key}>
                          <img
                            className={style.image}
                            src={each}
                            layout="fill"
                          ></img>
                        </div>
                      </div>
                    );
                  })
                ) : postImageURLs.length !== 0 ? (
                  postImageURLs.map((each, key) => {
                    return (
                      <div
                        className="field-row"
                        style={{ justifyContent: "center" }}
                      >
                        <div className={style.imageContainer} key={key}>
                          <img
                            className={style.image}
                            src={each}
                            layout="fill"
                          ></img>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>이미지 없음</p>
                )}
                <div style={{ margin: "1rem" }}>
                  <input
                    style={{
                      width: "100%",
                      borderBottom: "1px solid black",
                    }}
                    type="text"
                    maxLength="100"
                    placeholder="태그 쓰는 곳 : , 로 구분하여 입력"
                    value={tagString}
                    onChange={(e) => {
                      if (regExp.test(e.target.value)) {
                        setError("태그에 쉼표 외 특수문자 사용 불가능");
                        setTagString(e.target.value.replace(regExp, ""));
                        return;
                      }
                      setTagString(e.target.value);
                    }}
                  ></input>
                </div>
                <br />
                <div>
                  <input type="file" onChange={uploadPreviews} />
                </div>
                <br />
                <div>
                  <input
                    style={{ fontSize: "1.5rem", width: "100px" }}
                    type="submit"
                    value="글 등록"
                  ></input>
                </div>
                <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
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

export default updatePost;
