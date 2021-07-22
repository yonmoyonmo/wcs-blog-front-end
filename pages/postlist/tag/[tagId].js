import { useRouter } from "next/router";
import Link from "next/link";
import { endpointMania } from "../../../util/enpointMania";
import style from "../../../styles/Layout.module.css";

const postList = ({ posts }) => {
  const router = useRouter();
  return (
    <>
    <h2>{posts.data[0].postTagRelations[0].tag.tagName}</h2>
    <div className={style.grid}>
      {posts.success ? (
        posts.data.map((post) => {
          return (
            <>
              <Link href={`/post/${post.id}`}>
                <div className={style.card}>
                  <div key={post.id}>
                    <p>{post.title}</p>
                    <button>
                      이동
                    </button>
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
