import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";
import { endpointMania } from "../../util/enpointMania";

const postList = ({ posts, cateName }) => {
  const router = useRouter();
  const { name, cateId } = router.query;

  return (
    <>
      <Header props={"카테고리 : " + name}></Header>

      <div style={{ width: "100%" }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">post list</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <div className="field-row" style={{ justifyContent: "center" }}>
            <p>posts</p>
          </div>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/post/create?cateId=${cateId}&name=${name}`);
              }}
            >
              <Link href={`/post/create?cateId=${cateId}&name=${name}`}>
                글쓰기
              </Link>
            </button>
          </div>
          <br />
          <hr />

          {posts.success ? (
            posts.data.map((post) => {
              return (
                <div className="field-row" style={{ justifyContent: "center" }}>
                  <div
                    style={{ width: "90%" }}
                    className="window"
                    key={post.id}
                  >
                    <div className="title-bar">
                      <div className="title-bar-text">
                        {post.title +
                          " [" +
                          post.createdTime.split("T")[0] +
                          "]"}
                      </div>
                      <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                      </div>
                    </div>
                    <div className="window-body">
                      <div
                        className="field-row"
                        style={{ justifyContent: "center" }}
                      >
                        <p>글쓴이 : {post.blogUser.nickname}</p>
                      </div>
                      <div
                        className="field-row"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={`${post.images[0].imageURI}`}
                          style={{ width: "80%" }}
                        ></img>
                      </div>
                      <div
                        className="field-row"
                        style={{ justifyContent: "center" }}
                      >
                        <button
                          style={{ width: "75%" }}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/post/${post.id}`);
                          }}
                        >
                          <Link href={`/post/${post.id}`}>{post.title}</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>no post</p>
          )}
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
    if (posts) {
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
