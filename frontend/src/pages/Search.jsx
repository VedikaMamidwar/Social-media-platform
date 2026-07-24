import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { searchUsers, followUser } from "../services/userService";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser?.following) {
      setFollowingUsers(loggedUser.following);
    }
  }, []);

  useEffect(() => {
    if (keyword.trim() !== "") {
      handleSearch();
    } else {
      setUsers([]);
    }
  }, [keyword]);

  const handleSearch = async () => {
    try {
      const { data } = await searchUsers(keyword);
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (id) => {
    try {
      await followUser(id);

      let updatedFollowing = [];

      if (followingUsers.includes(id)) {
        updatedFollowing = followingUsers.filter(
          (userId) => userId !== id
        );
      } else {
        updatedFollowing = [...followingUsers, id];
      }

      setFollowingUsers(updatedFollowing);

      // Update localStorage
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...loggedUser,
          following: updatedFollowing,
        })
      );

      // Update UI
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
              ...user,
              isFollowing: !followingUsers.includes(id),
            }
            : user
        )
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update follow status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search users..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />

        <div className="mt-6 space-y-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">
              Search users...
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.profilePic ||
                      "https://i.pravatar.cc/100"
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {user.name}
                    </h2>

                    <p className="text-gray-500">
                      {user.email}
                    </p>

                    <p className="text-sm text-gray-600">
                      {user.bio || "No bio available"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(user._id)}
                  className={`px-5 py-2 rounded-lg text-white transition ${followingUsers.includes(user._id)
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {followingUsers.includes(user._id)
                    ? "Following"
                    : "Follow"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;