import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    getFollowers,
    getFollowing,
    followUser,
} from "../services/userService";

function FollowList() {
    const { id } = useParams();
    const location = useLocation();

    const [users, setUsers] = useState([]);

    const isFollowers = location.pathname.includes("followers");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = isFollowers
                ? await getFollowers(id)
                : await getFollowing(id);

            setUsers(
                isFollowers
                    ? data.followers
                    : data.following
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollow = async (userId) => {
        try {
            await followUser(userId);

            alert("Follow status updated");

            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-3xl mx-auto py-8">

                <h1 className="text-3xl font-bold mb-6">
                    {isFollowers ? "Followers" : "Following"}
                </h1>

                {users.length === 0 ? (
                    <p>No Users Found</p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white shadow rounded-xl p-4 flex justify-between items-center mb-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        user.profilePic ||
                                        "https://i.pravatar.cc/100"
                                    }
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h2 className="font-semibold">
                                        {user.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        {user.bio}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleFollow(user._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Follow
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FollowList;