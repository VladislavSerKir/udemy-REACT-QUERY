import { useQuery, useMutation } from "react-query";
import { deletePost, fetchComments, updatePost } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery

  const { data, isError, error, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id),
    {
      staleTime: 10000,
    }
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));

  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Something went wrong: {error.toString()}</h3>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has (not) deleted</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error updating the post</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Updating the post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has (not) updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
