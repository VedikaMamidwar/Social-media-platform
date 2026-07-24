import { FaHome, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">
          Mini Social
        </h1>

        <div className="flex items-center gap-6">
          <FaHome className="text-2xl cursor-pointer text-gray-700 hover:text-blue-600" />
          <FaSearch className="text-2xl cursor-pointer text-gray-700 hover:text-blue-600" />
          <FaUserCircle className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;