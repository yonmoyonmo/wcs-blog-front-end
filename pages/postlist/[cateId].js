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
          <p style={{ textAlign: "center" }}>posts</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button>
              <Link href={`/post/create?cateId=${cateId}&name=${name}`}>
                글쓰기 (post)
              </Link>
            </button>
          </div>
          <br/>
          <hr/>

          {posts.success ? (
            posts.data.map((post) => {
              return (
                <div
                  className="field-row"
                  style={{ justifyContent: "center" }}
                  key={post.id}
                >
                  <button>
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </button>
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
