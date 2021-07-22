import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";
import { endpointMania } from "../../util/enpointMania";
import style from "../../styles/Layout.module.css";

const postList = ({ posts, cateName }) => {
  const router = useRouter();
  const { name, cateId } = router.query;

  return (
    <>
      <Header props={name}></Header>
      <div>
        <div>
          <div>
            <div style={{ textAlign: "center" }}>
              <Link href={`/post/create?cateId=${cateId}&name=${name}`}>
                글쓰기
              </Link>
            </div>
            <hr />

            <div className={style.grid}>
              {posts.success ? (
                posts.data.map((post) => {
                  return (
                    <Link href={`/post/${post.id}`}>
                      <div style={{ margin: "0.8rem" }}>
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
                  );
                })
              ) : (
                <p>no post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { cateId } = context.query;
  const postListEndpoint = endpointMania(`/api/public/post/category/${cateId}`);

  try {
    const res = await fetch(postListEndpoint, {
      method: "GET",
    });
    let posts = await res.json();
    if (posts.data !== null) {
      posts.data = posts.data.sort((a, b) => {
        return b.id - a.id;
      });
    }
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
