import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaHeart,
  FaBookmark,
  FaCog,
  FaBell,
  FaCompass,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-white shadow-md p-6">
      <ul className="space-y-6">

        <li>
          <Link
            to="/home"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FaHome />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FaUser />
            <span>Profile</span>
          </Link>
        </li>

        <li>
          <Link
            to="/favorites"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FaHeart />
            <span>Favorites</span>
          </Link>
        </li>

        <li>
          <Link
            to="/saved"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FaBookmark />
            <span>Saved</span>
          </Link>
        </li>


        <Link to="/notifications">
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaBell />
            <span>Notifications</span>
          </li>
        </Link>


        <Link to="/explore">
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
            <FaCompass />
            <span>Explore</span>
          </li>
        </Link>


        <li>
          <Link
            to="/settings"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <FaCog />
            <span>Settings</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;