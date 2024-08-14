import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import "./PostList.css";

const PostLists = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log("data");
  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {data?.length > 0 &&
        data?.map((post) => {
          return (
            <div key={post.id} className="post">
              <div>{post.title}</div>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default PostLists;
