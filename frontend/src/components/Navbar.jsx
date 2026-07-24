import {
    FaHome,
    FaSearch,
    FaPlusSquare,
    FaHeart,
    FaUserCircle,
} from "react-icons/fa";

function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-blue-600">
                    Mini Social
                </h1>

                {/* Search */}
                <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-lg w-80">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="ml-3 bg-transparent outline-none w-full"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6 text-2xl">
                    <FaHome className="cursor-pointer hover:text-blue-600" />
                    <FaPlusSquare className="cursor-pointer hover:text-blue-600" />
                    <FaHeart className="cursor-pointer hover:text-red-500" />
                    <FaUserCircle className="cursor-pointer hover:text-blue-600 text-3xl" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;