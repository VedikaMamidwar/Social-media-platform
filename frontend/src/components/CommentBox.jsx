import { useState, useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { PostContext } from "../context/PostContext";
import { addComment } from "../services/postService";

function CommentBox({ postId }) {
  const [comment, setComment] = useState("");

  const { posts, setPosts } = useContext(PostContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      const { data } = await addComment(postId, comment);

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
              ...post,
              comments: data.comments,
            }
            : post
        )
      );

      setComment("");

    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex items-center gap-3"
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded-full px-4 py-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-full p-3"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
}

export default CommentBox;