import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { getPostById } from "../services/postService";

function SinglePost() {
    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const { data } = await getPostById(id);
            setPost(data.post);
        } catch (error) {
            console.log(error);
        }
    };

    if (!post) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-2xl mx-auto py-8">
                <PostCard
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
            </div>
        </div>
    );
}

export default SinglePost;