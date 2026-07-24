import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser(userData);

            // Save Token
            localStorage.setItem("token", data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    profilePic: data.user.profilePic || "",
                    bio: data.user.bio || "",
                    followers: data.user.followers || [],
                    following: data.user.following || [],
                })
            );

            alert(data.message);

            navigate("/home");
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <AuthLayout
            title="Mini Social"
            subtitle="Welcome back! Please login to continue."
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />

                <Button
                    text="Login"
                    type="submit"
                />
            </form>

            <p className="text-center mt-6 text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;