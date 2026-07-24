
function ProfilePosts({ posts = [] }) {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Posts
      </h2>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No posts available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="overflow-hidden rounded-xl shadow-md bg-white"
            >
              <img
                src={
                  post.image ||
                  "https://via.placeholder.com/300x300?text=No+Image"
                }
                alt="Post"
                className="w-full h-72 object-cover hover:scale-105 transition duration-300"
              />

              <div className="p-3">
                <p className="text-sm text-gray-700">
                  {post.caption}
                </p>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>❤️ {post.likes?.length || 0} Likes</span>
                  <span>💬 {post.comments?.length || 0} Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePosts;