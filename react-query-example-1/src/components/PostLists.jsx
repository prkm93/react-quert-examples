import { useMutation, useQuery } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import "./PostList.css";

const PostLists = () => {
  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  // const {
  //   mutate,
  //   isError: isPostError,
  //   isPending,
  //   error: postError,
  // } = useMutation({
  //   mutationFn: addPost,
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    console.log("title", title);
    console.log("formData", Array.from(formData.keys));
  };

  console.log("data");
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="postbox"
          placeholder="Enter your post"
        />
        <div className="tags">
          {tagsData?.map((tag) => {
            return (
              <div key={tag} className="tag">
                <input
                  name={tag}
                  id={tag}
                  type="checkbox"
                  className="checkbox"
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button className="post_btn">Post</button>
      </form>
      {isLoading && <h3>Loading...</h3>}
      {isError && <p>{error?.message}</p>}
      {postData?.length > 0 &&
        postData?.map((post) => {
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
