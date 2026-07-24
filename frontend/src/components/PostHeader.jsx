import { FaTrash, FaEdit } from "react-icons/fa";
import Avatar from "./ui/Avatar";

function PostHeader({
    id,
    name,
    time,
    profileImage,
    onDelete,
    onEdit,
    userId,
}) {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const isOwner = loggedInUser?.id === userId;

    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
                <Avatar
                    src={
                        profileImage ||
                        "https://i.pravatar.cc/150?img=5"
                    }
                    alt={name}
                />

                <div>
                    <h2 className="font-semibold">
                        {name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {time}
                    </p>
                </div>
            </div>

            {isOwner && (
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => onEdit(id)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <FaEdit />
                    </button>

                    <button
                        onClick={() => onDelete(id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FaTrash />
                    </button>

                </div>
            )}

        </div>
    );
}

export default PostHeader;