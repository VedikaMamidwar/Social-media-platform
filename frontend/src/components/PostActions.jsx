import { useContext, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";

import { PostContext } from "../context/PostContext";
import {
  likePost,
  bookmarkPost,
} from "../services/postService";

import CommentModal from "./CommentModal";

function PostActions({
  id,
  liked = false,
  likes = [],
  comments = [],
  bookmarked = false,
  refreshPosts,
}) {
  const { toggleLike } = useContext(PostContext);

  const [openComments, setOpenComments] = useState(false);

  const handleLike = async () => {
    try {
      await likePost(id);
      toggleLike(id);

      if (refreshPosts) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to like post");
    }
  };

  const handleBookmark = async () => {
    try {
      await bookmarkPost(id);

      alert("Bookmark Updated");

      if (refreshPosts) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
      alert("Bookmark failed");
    }
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mini Social",
          text: "Check out this post!",
          url: postUrl,
        });
      } else {
        await navigator.clipboard.writeText(postUrl);
        alert("Post link copied to clipboard!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-5 border-t pt-4">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-2 hover:text-red-500"
          >
            {liked ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
            <span>{likes.length}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setOpenComments(true)}
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <FaRegComment />
            <span>{comments.length}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-green-500 transition"
          >
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className="hover:text-yellow-500 text-xl"
        >
          {bookmarked ? (
            <FaBookmark className="text-yellow-500" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={openComments}
        onClose={() => setOpenComments(false)}
        postId={id}
        comments={comments}
        refreshPosts={refreshPosts}
      />
    </>
  );
}

export default PostActions;