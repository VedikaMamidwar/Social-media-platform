import API from "../api/axios";

// Get Notifications
export const getNotifications = () => {
    return API.get("/notification");
};

// Mark All Read
export const markAllRead = () => {
    return API.put("/notification/read");
};