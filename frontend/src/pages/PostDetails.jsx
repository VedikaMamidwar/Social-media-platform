import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import API from "../api/axios";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const { data } = await API.get(`/post/${id}`);
            setPost(data.post);
        } catch (error) {
            console.log(error);
        }
    };

    if (!post) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-2xl mx-auto mt-8">
                <PostCard
                    id={post._id}
                    userId={post.user._id}
                    name={post.user.name}
                    profileImage={post.user.profilePic}
                    caption={post.caption}
                    postImage={post.image}
                    likes={post.likes}
                    comments={post.comments}
                />
            </div>
        </div>
    );
}

export default PostDetails;