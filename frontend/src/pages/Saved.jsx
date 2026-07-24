import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSavedPosts } from "../services/userService";

function Saved() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchSavedPosts();
    }, []);

    const fetchSavedPosts = async () => {
        try {
            const { data } = await getSavedPosts();
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-6xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Saved Posts
                </h1>

                {posts.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No Saved Posts
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {posts.map((post) => (

                            <div
                                key={post._id}
                                className="bg-white rounded-xl shadow-md overflow-hidden"
                            >

                                <img
                                    src={
                                        post.image ||
                                        "https://via.placeholder.com/300"
                                    }
                                    alt=""
                                    className="w-full h-72 object-cover"
                                />

                                <div className="p-4">

                                    <h2 className="font-semibold">
                                        {post.user?.name}
                                    </h2>

                                    <p className="mt-2">
                                        {post.caption}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-3">
                                        ❤️ {post.likes?.length || 0} Likes
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Saved;