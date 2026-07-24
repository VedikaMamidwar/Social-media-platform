import Notification from "../models/Notification.js";

// Get logged-in user's notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.user._id,
        })
            .populate("sender", "name profilePic")
            .populate("post", "image caption")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { receiver: req.user._id },
            { isRead: true }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};