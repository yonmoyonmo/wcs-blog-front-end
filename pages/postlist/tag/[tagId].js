import { useRouter } from "next/router";
import Link from "next/link";
import { endpointMania } from "../../../util/enpointMania";
import style from "../../../styles/Layout.module.css";

const postList = ({ posts }) => {
  const router = useRouter();
  const { catename, cateid, page } = router.query;
  return (
    <div className="window" style={{ width: "70vw" }}>
      <div className="title-bar">
        <div className="title-bar-text">
          {posts.data[0].postTagRelations[0].tag.tagName}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div
        className="window-body"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {posts.success ? (
          posts.data.map((post) => {
            return (
              <>
                <Link
                  href={`/post/${post.id}?catename=${catename}&cateid=${cateid}&page=${page}`}
                >
                  <div>
                    <div key={post.id} style={{height:"70px"}}>
                      <button>{post.title}</button>
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
  );
};

export async function getServerSideProps(context) {
  const { tagId } = context.query;
  const postListEndpoint = endpointMania(`/api/public/post/tag/${tagId}`);

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
    return { props: { posts } };
  }
}

export default postList;
