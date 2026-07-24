import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postService";

function Explore() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchExplorePosts();
    }, []);

    const fetchExplorePosts = async () => {
        try {
            const { data } = await getPosts();
            setPosts(data.posts || []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-6xl mx-auto py-8 px-4">

                <h1 className="text-3xl font-bold mb-8">
                    🌍 Explore
                </h1>

                {posts.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        No posts found.
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-6">

                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                id={post._id}
                                userId={post.user?._id}
                                name={post.user?.name}
                                time={new Date(post.createdAt).toLocaleString()}
                                caption={post.caption}
                                profileImage={post.user?.profilePic}
                                postImage={post.image}
                                liked={post.liked}
                                likes={post.likes}
                                comments={post.comments}
                                bookmarked={post.bookmarked}
                            />
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Explore;