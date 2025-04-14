import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { userLogin } from "../utils/user";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(email, password);
      setUser(user);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {/* Main Content */}
      <div className="flex flex-col items-center py-8 ">
        {/* Welcome Text */}
        <h1 className="m-7 mb-8 sm:text-4xl text-center">
          Welcome back to the hub.
        </h1>
        <h2 className="text-neon mb-8 sm:text-2xl">Sign in</h2>

        {/* Form */}
        <form onSubmit={handleSignIn} className="w-full space-y-4">
          {error && <p className="text-error text-center text-sm">{error}</p>}

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
              className="input input-bordered w-full bg-primary focus:outline-lilac rounded-2xl"
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
              className="input input-bordered w-full bg-primary focus:outline-lilac rounded-2xl"
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="btn btn-secondary self-end mt-4 mb-8"
            >
              sign in
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center bg-primary w-full rounded-xl p-6">
          <h2 className=" mb-8">New here?</h2>
          <button
            onClick={() => navigate("/signup")}
            className="btn bg-ultramarine text-base hover:bg-[#4536FF] border-none"
          >
            sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
