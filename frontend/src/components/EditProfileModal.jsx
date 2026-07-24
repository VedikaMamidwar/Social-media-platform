import { useState, useEffect } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { updateProfile } from "../services/userService";

function EditProfileModal({
  isOpen,
  onClose,
  user,
  setUser,
}) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePic: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateProfile(formData);

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          name: data.user.name,
          profilePic: data.user.profilePic,
        })
      );

      alert("Profile updated successfully");

      onClose();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[420px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <Input
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />

          <Input
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="Profile Image URL"
          />

          <Button
            text="Save Changes"
            type="submit"
          />

        </form>

        <button
          onClick={onClose}
          className="mt-4 text-red-500"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default EditProfileModal;