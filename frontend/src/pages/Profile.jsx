import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import {
    getProfile,
    followUser,
} from "../services/userService";

function UserProfile() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            const { data } = await getProfile(id);

            setUser(data.user);
            setPosts(data.posts);

            const loggedUser = JSON.parse(localStorage.getItem("user"));

            setIsFollowing(
                data.user.followers.some(
                    (follower) => follower._id === loggedUser.id
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollow = async () => {
        try {
            await followUser(id);

            setIsFollowing(!isFollowing);

            fetchProfile();
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">

                <div className="flex items-center gap-8">

                    <img
                        src={
                            user.profilePic ||
                            "https://i.pravatar.cc/150"
                        }
                        alt=""
                        className="w-36 h-36 rounded-full"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            {user.name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {user.bio}
                        </p>

                        <div className="flex gap-10 mt-6">

                            <div>
                                <h2 className="font-bold">
                                    {posts.length}
                                </h2>
                                <p>Posts</p>
                            </div>

                            <div>
                                <h2 className="font-bold">
                                    {user.followers.length}
                                </h2>
                                <p>Followers</p>
                            </div>

                            <div>
                                <h2 className="font-bold">
                                    {user.following.length}
                                </h2>
                                <p>Following</p>
                            </div>

                        </div>

                        <button
                            onClick={handleFollow}
                            className={`mt-6 px-6 py-2 rounded-lg text-white ${isFollowing
                                    ? "bg-gray-600"
                                    : "bg-blue-600"
                                }`}
                        >
                            {isFollowing
                                ? "Following"
                                : "Follow"}
                        </button>

                    </div>

                </div>

                <ProfilePosts posts={posts} />

            </div>

        </div>
    );
}

export default UserProfile;