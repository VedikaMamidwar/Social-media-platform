import { createContext, useState } from "react";

export const PostContext = createContext();

function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);

    const toggleLike = (id) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post._id !== id) return post;

                const liked = post.liked || false;

                let likes = [...(post.likes || [])];

                if (liked) {
                    likes.pop();
                } else {
                    likes.push({
                        _id: "currentUser",
                    });
                }

                return {
                    ...post,
                    liked: !liked,
                    likes,
                };
            })
        );
    };

    const addComment = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        comments: [...(post.comments || []), comment],
                    }
                    : post
            )
        );
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                setPosts,
                toggleLike,
                addComment,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export default PostProvider;