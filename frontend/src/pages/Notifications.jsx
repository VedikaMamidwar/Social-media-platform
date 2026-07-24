import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import {
  getNotifications,
  markAllRead,
} from "../services/notificationService";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await getNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async () => {
    try {
      await markAllRead();
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-5">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            🔔 Notifications
          </h1>

          <button
            onClick={handleRead}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Mark All Read
          </button>

        </div>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">

            <div className="text-7xl mb-5">🔔</div>

            <h2 className="text-2xl font-bold">
              You're all caught up!
            </h2>

            <p className="text-gray-500 mt-2">
              No new notifications.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;