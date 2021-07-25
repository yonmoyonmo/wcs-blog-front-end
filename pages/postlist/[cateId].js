import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";
import { endpointMania } from "../../util/enpointMania";
import style from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import post from "../post/[postId]";

const postList = ({ posts }) => {
  const router = useRouter();
  const { name, cateId, page } = router.query;

  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const [pageLimit, setPageLimit] = useState();

  useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      setPageLimit(posts.data.totalPages);
    };
  }, [posts]);

  const pagginationHandler = (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.name == "prev") {
      let targetPage = parseInt(target.value);
      if (targetPage != 0) {
        router.push(`/postlist/${cateId}?name=${name}&page=${targetPage - 1}`);
      } else {
        router.push(`/postlist/${cateId}?name=${name}&page=0`);
      }
    } else {
      let targetPage = parseInt(target.value);
      if (targetPage >= pageLimit) {
        console.log(pageLimit);
        router.push(`/postlist/${cateId}?name=${name}&page=${pageLimit - 1}`);
      } else {
        router.push(`/postlist/${cateId}?name=${name}&page=${targetPage + 1}`);
      }
    }
  };

  let content = null;
  if (isLoading) content = <Loading />;
  else {
    content = (
      <div>
        <div>
          <div>
            <div style={{ textAlign: "center" }}>
              <Link href={`/post/create?cateId=${cateId}&name=${name}&page=${page}`}>
                글쓰기
              </Link>
            </div>
            <hr />

            <div className={style.grid}>
              {posts.success ? (
                posts.data.content.map((post) => {
                  return (
                    <>
                      <Link
                        href={`/post/${post.id}?catename=${name}&cateid=${cateId}&page=${page}`}
                      >
                        <div style={{ margin: "0.8rem", cursor: "pointer" }}>
                          <div className="window">
                            <div className="title-bar">
                              <div className="title-bar-text">
                                {post.title.substr(0, 10)}
                              </div>
                              <div className="title-bar-controls">
                                <button aria-label="Minimize" />
                                <button aria-label="Maximize" />
                                <button aria-label="Close" />
                              </div>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                padding: "1rem",
                              }}
                            >
                              <div key={post.id}>
                                <div>
                                  <div>
                                    <p style={{ fontWeight: "1000" }}>
                                      {post.title}
                                    </p>
                                    <p>글쓴이 : {post.blogUser.nickname}</p>
                                  </div>
                                  <div style={{ margin: "1rem" }}>
                                    {"[" + post.createdTime.split("T")[0] + "]"}
                                  </div>
                                  <div
                                    style={{
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "230px",
                                      height: "230px",
                                      margin: "auto",
                                    }}
                                  >
                                    <div
                                      key={post.images[0].id}
                                      className={style.imageContainer}
                                    >
                                      <img
                                        className={style.image}
                                        src={`${post.images[0].imageURI}`}
                                      ></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })
              ) : (
                <p>no post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header props={name}></Header>
      {content}
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        {posts.data.last ? (
          <>
            <p>마지막 페이지입니다.</p>
            <button value={page} name="prev" onClick={pagginationHandler}>
              이전 페이지
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/postlist/${cateId}?name=${name}&page=0`);
              }}
            >
              첫 페이지로...
            </button>
          </>
        ) : (
          <>
            {posts.data.number == 0 ? <p>첫 페이지입니다.</p> : <></>}
            <button value={page} name="prev" onClick={pagginationHandler}>
              이전 페이지
            </button>
            <button value={page} name="next" onClick={pagginationHandler}>
              다음 페이지
            </button>
          </>
        )}
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export async function getServerSideProps(context) {
  const { cateId, page } = context.query;
  const postListEndpoint = endpointMania(
    `/api/public/post/category/${cateId}?page=${page}`
  );

  try {
    const res = await fetch(postListEndpoint, {
      method: "GET",
    });

    const posts = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (e) {
    console.log(e);
    const posts = { success: false };
    return {
      props: {
        posts,
      },
    };
  }
}

export default postList;
