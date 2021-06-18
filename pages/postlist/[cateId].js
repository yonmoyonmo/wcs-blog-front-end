import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";
import { endpointMania } from "../../util/enpointMania";

const postList = ({ posts }) => {
  const router = useRouter();
  const { cateId } = router.query;

  return (
    <>
      <Header props={cateId}></Header>
      <div>
        {posts.success ? (
          posts.data.map((post) => {
            return (
              <div key={post.id}>
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </div>
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
    return { props: { posts } };
  }
}

export default postList;
