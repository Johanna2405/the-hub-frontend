import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Function to handle login
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/auth/login", { email, password });

            // Save auth token and username in localStorage
            console.log("Login Response:", response.data);

            // Save auth token and username in localStorage
            localStorage.setItem("authToken", response.data.token)

            // Fix: Adjust this based on the API response structure
            const username = response.data.user?.username || response.data.user?.name || response.data.user?.email;
            localStorage.setItem("username", username);

            navigate("/");
            window.location.reload();

        } catch (error) {
            console.error("Login failed:", err);
            setError("Invalid credentials. Please try again.");
        }
    }

    return (

        <div className="min-h-screen flex flex-col items-center justify-between">

            {/* Main Content */}
            <div className="flex flex-col items-center w-full max-w-md px-4 py-8 sm:max-w-lg md:max-w-xl lg:max-w-2xl">

                {/* Logo */}
                <div className="text-5xl mb-2 sm:text-6xl">LOGO</div>

                {/* Welcome Text */}
                <h1 className="m-7 mb-8 sm:text-4xl">Welcome to the hub.</h1>
                <h2 className="text-neon mb-8 sm:text-2xl">Sign in</h2>

                {/* Form */}
                <form onSubmit={handleSignIn} className="w-full space-y-4">
                    {error && <p className="text-error text-center text-sm">{error}</p>}

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-text font-medium">E-Mail</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full bg-primary text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
                            required />
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-text font-medium">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-primary text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
                            required
                        />
                    </div>

                    {/* Sign In Button */}
                    <div className="mt-6 text-right">
                        <button
                            type="submit"
                            className="btn btn-secondary w-32 self-end mt-4 mb-8"
                        >
                            sign in
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 mb-6 text-center bg-primary w-full rounded-xl p-6">
                    <h2 className=" mb-8">New here?</h2>
                    <button
                        onClick={() => navigate("/signup")}
                        className="btn bg-ultramarine text-base w-32 hover:bg-[#4536FF] border-none"
                    >
                        sign up
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-info text-white text-center py-10">
                <h2 className="text-white py-25">Placeholder Footer</h2>
            </footer>
        </div>
    );
}

export default SignIn;