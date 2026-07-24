import API from "../api/axios";

// Get logged-in user's profile
export const getProfile = (id) => {
    return API.get(`/user/profile/${id}`);
};

// Update profile
export const updateProfile = (profileData) => {
    return API.put("/user/profile", profileData);
};

// Follow / Unfollow user
export const followUser = (id) => {
    return API.put(`/user/follow/${id}`);
};

// Search users
export const searchUsers = (keyword) => {
    return API.get(`/user/search?keyword=${keyword}`);
};

// Save / Unsave Post
export const savePost = (id) => {
    return API.put(`/user/save/${id}`);
};

// Get Saved Posts
export const getSavedPosts = () => {
    return API.get("/user/saved");
};

export const getFollowers = (id) => {
    return API.get(`/user/followers/${id}`);
};

export const getFollowing = (id) => {
    return API.get(`/user/following/${id}`);
};
