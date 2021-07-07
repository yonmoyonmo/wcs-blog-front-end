import { useRouter } from "next/router";
import Link from "next/link";
import { endpointMania } from "../../../util/enpointMania";

const postList = ({ posts }) => {
  const router = useRouter();
  return (
    <>
      <div style={{ width: "100%" }} className="window">
        {posts.success ? (
          posts.data.map((post) => {
            return (
              <>
                <div className="title-bar">
                  <div className="title-bar-text">{post.title}</div>
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
                    key={post.id}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/post/${post.id}`);
                      }}
                    >
                      <div key={post.id}>
                        <Link href={`/post/${post.id}`}>이동</Link>
                      </div>
                    </button>
                  </div>
                </div>
                <br />
              </>
            );
          })
        ) : (
          <p>no post</p>
        )}
      </div>
    </>
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
