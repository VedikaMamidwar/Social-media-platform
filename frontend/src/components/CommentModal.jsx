import { useState } from "react";
import { addComment } from "../services/postService";

function CommentModal({
    isOpen,
    onClose,
    postId,
    comments = [],
    refreshPosts,
}) {
    const [text, setText] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert("Please enter a comment");
            return;
        }

        try {
            await addComment(postId, text);

            setText("");

            // Refresh all posts so new comment appears
            if (refreshPosts) {
                await refreshPosts();
            }

            alert("Comment added successfully");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to add comment");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[500px] rounded-xl p-6">

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">
                        Comments
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-red-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto mb-5">
                    {comments.length === 0 ? (
                        <p className="text-gray-500">
                            No comments yet.
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="bg-gray-100 p-3 rounded-lg"
                            >
                                <h3 className="font-semibold">
                                    {comment.user?.name || "User"}
                                </h3>

                                <p>{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Add Comment
                </button>

            </div>
        </div>
    );
}

export default CommentModal;