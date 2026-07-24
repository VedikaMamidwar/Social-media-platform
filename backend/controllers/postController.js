import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";


export const createPost = async (req, res) => {
    try {
        const { caption, image } = req.body;

        let post = await Post.create({
            user: req.user._id,
            caption,
            image,
        });

        post = await post.populate("user", "name profilePic");

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name profilePic")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name profilePic",
                },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate("user", "name profilePic bio")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "name profilePic",
                },
            });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { caption, image } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check ownership
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post",
            });
        }

        if (caption !== undefined) {
            post.caption = caption;
        }

        if (image !== undefined) {
            post.image = image;
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check ownership
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this post",
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleLikePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const userId = req.user._id.toString();

        const liked = post.likes.some(
            (like) => like.toString() === userId
        );

        if (liked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);

            // Notify only if someone likes another user's post
            if (post.user.toString() !== userId) {
                const currentUser = await User.findById(userId);

                await Notification.create({
                    sender: userId,
                    receiver: post.user,
                    post: post._id,
                    type: "LIKE",
                    text: `${currentUser.name} liked your post`,
                });
            }
        }
        await post.save();

        res.status(200).json({
            success: true,
            liked: !liked,
            likes: post.likes,
            totalLikes: post.likes.length,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const toggleBookmarkPost = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const alreadySaved = user.savedPosts.some(
            (postId) => postId.toString() === id
        );

        if (alreadySaved) {
            user.savedPosts.pull(id);
        } else {
            user.savedPosts.push(id);
        }

        await user.save();

        res.status(200).json({
            success: true,
            bookmarked: !alreadySaved,
            savedPosts: user.savedPosts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBookmarkedPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "savedPosts",
            populate: {
                path: "user",
                select: "name profilePic",
            },
        });

        res.status(200).json({
            success: true,
            count: user.savedPosts.length,
            posts: user.savedPosts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty",
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        post.comments.push({
            user: req.user._id,
            text,
        });

        // Create notification
        if (post.user.toString() !== req.user._id.toString()) {
            const currentUser = await User.findById(req.user._id);

            await Notification.create({
                sender: req.user._id,
                receiver: post.user,
                post: post._id,
                type: "COMMENT",
                text: `${currentUser.name} commented on your post`,
            });
        }


        await post.populate({
            path: "comments.user",
            select: "name profilePic",
        });

        res.status(201).json({
            success: true,
            message: "Comment added",
            comments: post.comments,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};