import {
    FaHeart,
    FaComment,
    FaUserPlus,
} from "react-icons/fa";

function NotificationCard({ notification }) {
    const getIcon = () => {
        switch (notification.type) {
            case "LIKE":
                return <FaHeart className="text-red-500 text-xl" />;
            case "COMMENT":
                return <FaComment className="text-blue-500 text-xl" />;
            case "FOLLOW":
                return <FaUserPlus className="text-green-500 text-xl" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300 flex items-center justify-between">

            <div className="flex items-center gap-4">

                <img
                    src={
                        notification.sender?.profilePic ||
                        "https://i.pravatar.cc/150"
                    }
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                    <p className="font-semibold flex items-center gap-2">
                        {getIcon()}
                        {notification.text}
                    </p>

                    <p className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                    </p>
                </div>

            </div>

            {!notification.isRead && (
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            )}

        </div>
    );
}

export default NotificationCard;