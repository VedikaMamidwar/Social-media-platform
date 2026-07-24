import { useState, useContext } from "react";
import API from "../api/axios";
import { PostContext } from "../context/PostContext";
import { createPost } from "../services/postService";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const { setPosts } = useContext(PostContext);

  const handleCreatePost = async () => {
    if (!caption.trim() && !image) {
      alert("Write something or select an image");
      return;
    }

    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await API.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      // Create Post
      const { data } = await createPost({
        caption,
        image: imageUrl,
      });

      setPosts((prevPosts) => [data.post, ...prevPosts]);

      setCaption("");
      setImage(null);

      alert("Post Created Successfully");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create post"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">

      <textarea
        rows={4}
        placeholder="What's on your mind?"
        className="w-full border rounded-lg p-3 resize-none"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mt-4 w-full border rounded-lg p-2"
      />

      <button
        onClick={handleCreatePost}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Create Post
      </button>

    </div>
  );
}

export default CreatePost;