import API from "../api/axios";

// Create Post
export const createPost = (postData) => {
    return API.post("/post", postData);
};

// Get All Posts
export const getPosts = () => {
    return API.get("/post");
};

// Delete Post
export const deletePost = (id) => {
    return API.delete(`/post/${id}`);
};

// Update Post
export const updatePost = (id, postData) => {
    return API.put(`/post/${id}`, postData);
};

// Like / Unlike
export const likePost = (id) => {
    return API.put(`/post/${id}/like`);
};

// Add Comment
export const addComment = (id, text) => {
    return API.post(`/post/${id}/comment`, {
        text,
    });
};

// Bookmark / Unbookmark
export const bookmarkPost = (id) => {
    return API.put(`/post/${id}/bookmark`);
};

// Get Bookmarked Posts
export const getBookmarkedPosts = () => {
    return API.get("/post/bookmarks");
};

export const getSavedPosts = () => {
    return API.get("/post/bookmarks");
};

// Get Single Post
export const getPostById = (id) => {
    return API.get(`/post/${id}`);
};