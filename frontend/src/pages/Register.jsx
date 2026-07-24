import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Step 1: Form submitted");

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Step 2: Before API call");

      const response = await registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      console.log("Step 3: API response");
      console.log(response);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.log("Step 4: Error");
      console.log(error);
      console.log(error.response);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthLayout
      title="Mini Social"
      subtitle="Create your account"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={userData.password}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button
          text="Register"
          type="submit"
        />
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;