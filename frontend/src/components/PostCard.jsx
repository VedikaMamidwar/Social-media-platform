import Card from "./ui/Card";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import CommentBox from "./CommentBox";
function PostCard({
    id,
    userId,
    name,
    time,
    caption,
    profileImage,
    postImage,
    liked = false,
    likes = [],
    comments = [],
    bookmarked = false,
    refreshPosts,
    onDelete,
    onEdit,
}) {
    return (
        <Card className="mb-6">
            <PostHeader
                id={id}
                userId={userId}
                name={name}
                time={time}
                profileImage={profileImage}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            {caption && (
                <p className="my-4 text-gray-800">
                    {caption}
                </p>
            )}

            {postImage && (
                <img
                    src={postImage}
                    alt="Post"
                    className="w-full rounded-lg object-cover max-h-[500px]"
                />
            )}

            <PostActions
                id={id}
                liked={liked}
                likes={likes}
                comments={comments}
                bookmarked={bookmarked}
                refreshPosts={refreshPosts}
            />
            <CommentBox postId={id} />

            {comments.length > 0 && (
                <div className="mt-4 space-y-2">
                    {comments.map((comment, index) => (
                        <div
                            key={comment._id || comment.createdAt || index}
                            className="bg-gray-100 rounded-lg p-2"
                        >
                            <strong>
                                {comment.user?.name || "User"}:
                            </strong>{" "}
                            {comment.text || comment}
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}

export default PostCard;