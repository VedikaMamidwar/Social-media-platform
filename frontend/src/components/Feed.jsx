import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import {
    getPosts,
    deletePost,
    updatePost,
} from "../services/postService";
import PostCard from "./PostCard";

function Feed() {
    const { posts, setPosts } = useContext(PostContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fetch all posts
    const fetchPosts = async () => {
        try {
            const { data } = await getPosts();
            setPosts(data.posts || []);
        } catch (error) {
            console.log(error);
        }
    };

    // Delete post
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {
            await deletePost(id);

            setPosts((prevPosts) =>
                prevPosts.filter((post) => post._id !== id)
            );

            alert("Post deleted successfully");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    // Edit post
    const handleEdit = async (id) => {
        const newCaption = prompt("Edit your caption");

        if (!newCaption || newCaption.trim() === "") return;

        try {
            const { data } = await updatePost(id, {
                caption: newCaption,
            });

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === id
                        ? {
                            ...post,
                            caption: data.post.caption,
                        }
                        : post
                )
            );

            alert("Post updated successfully");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <main className="flex-1 max-w-2xl">
            {posts?.length > 0 ? (
                posts.map((post) => (

                    <PostCard
                        key={post._id}
                        id={post._id}
                        userId={post.user?._id}
                        name={post.user?.name}
                        time={
                            post.createdAt
                                ? new Date(post.createdAt).toLocaleString()
                                : ""
                        }
                        caption={post.caption}
                        profileImage={post.user?.profilePic || ""}
                        postImage={post.image || ""}
                        liked={post.liked || false}
                        likes={post.likes || []}
                        comments={post.comments || []}
                        bookmarked={post.bookmarked || false}
                        refreshPosts={fetchPosts}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))
            ) : (
                <div className="text-center mt-10 text-gray-500">
                    No posts yet.
                </div>
            )}
        </main>
    );
}

export default Feed;