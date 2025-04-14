import { useState } from "react";
import { useNavigate } from "react-router";
import { createUser } from "../utils/user";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("📤 Sending signup payload:", {
      username,
      email,
      password,
      community_id: 1,
      profile_picture: null,
    });

    try {
      // API call to create the user
      await createUser({
        username: username,
        email,
        password,
        community_id: null, // Assuming a default community ID
        profile_picture: null,
      });

      alert("Sign up successful!");
      navigate("/signin"); // Redirect to Sign In after success
    } catch (error) {
      console.error("Signup error:", error);

      // Show either single Joi error or the general text
      const backendErrors = error?.response?.data?.errors;
      const message =
        backendErrors?.length > 0
          ? backendErrors[0] // Show first joi error
          : error?.response?.data?.message ||
            "Signup failed. Please try again.";

      setError(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {/* Main Content */}
      <div className="flex flex-col items-center py-8 ">
        {/* Welcome Text */}
        <h1 className="m-7 mb-8 sm:text-4xl text-center">
          Welcome to the hub.
        </h1>
        <h2 className="text-neon mb-6 sm:text-2xl">Sign up</h2>

        {/* Form */}
        <form onSubmit={handleSignUp} className="w-full space-y-4">
          {error && <p className="text-error text-center text-sm">{error}</p>}

          {/* Username Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-text pb-2">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text font-medium pb-2">
                E-Mail
              </span>
            </label>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text font-medium pb-2">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text font-medium pb-2">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="btn btn-secondary self-end mt-4 mb-8"
            >
              sign up
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 mb-6 text-center bg-primary w-full rounded-xl p-6">
          <h2 className=" mb-8">Already have an account?</h2>
          <button
            onClick={() => navigate("/signin")}
            className="btn bg-ultramarine text-base hover:bg-[#4536FF] border-none"
          >
            sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
