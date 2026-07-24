import Avatar from "./ui/Avatar";
import Card from "./ui/Card";

function RightSidebar() {
    return (
        <Card className="w-80 h-fit">
            <h2 className="text-xl font-bold mb-4">
                Suggested Users
            </h2>

            {[1, 2, 3, 4].map((user) => (
                <div
                    key={user}
                    className="flex items-center justify-between mb-4"
                >
                    <div className="flex items-center gap-3">
                        <Avatar
                            src={`https://i.pravatar.cc/40?img=${user}`}
                            alt={`User ${user}`}
                            size="w-10 h-10"
                        />

                        <div>
                            <h3 className="font-semibold">
                                User {user}
                            </h3>

                            <p className="text-sm text-gray-500">
                                @user{user}
                            </p>
                        </div>
                    </div>

                    <button className="text-blue-600 font-semibold hover:underline">
                        Follow
                    </button>
                </div>
            ))}
        </Card>
    );
}

export default RightSidebar;