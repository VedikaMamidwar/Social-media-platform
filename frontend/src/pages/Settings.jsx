import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Settings() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logged out successfully");

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Settings
                </h1>

                <div className="space-y-6">

                    <div>
                        <p className="text-gray-500">Name</p>
                        <h2 className="font-semibold text-lg">
                            {user?.name}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <h2 className="font-semibold text-lg">
                            {user?.email}
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>

                    <button
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
                    >
                        Change Password
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Settings;