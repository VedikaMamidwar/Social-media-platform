import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import Feed from "../components/Feed";
import CreatePost from "../components/CreatePost";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex gap-6 p-6">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Content */}
        <div className="flex-1 max-w-2xl">
          <CreatePost />
          <Feed />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}

export default Home;