import { useState } from "react";
import { useNavigate } from "react-router"

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }
      alert("Sign up successful!");
      navigate("/signin"); // Redirect to Sign In after successful signup
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between text-[#000814]">
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <img src="/logo.svg" alt="Logo" className="h-16 mb-4" />
        <h1 className="text-2xl font-bold text-center mb-1">Welcome to the hub.</h1>
        <h2 className="text-xl text-[#e5f000] font-semibold mb-6">Sign up</h2>

        <form onSubmit={handleSignUp} className="w-full space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              className="input input-bordered w-full bg-[#dee7f0] text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">E-Mail</label>
            <input
              type="email"
              className="input input-bordered w-full bg-[#dee7f0] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-[#dee7f0] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-[#dee7f0] text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn bg-[#e5d4ff] text-[#000814] font-bold w-full hover:bg-[#c7b1ff]">
            sign up
          </button>
        </form>

        <div className="bg-[#dee7f0] w-full mt-6 rounded-xl p-4 text-center">
          <p className="font-bold">Already have an account?</p>
          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/signin")}
          >
            sign in
          </button>
        </div>
      </div>

      <footer className="bg-[#4f46e5] w-full text-center py-6 text-white font-bold">
        Placeholder Footer
      </footer>
    </div>
  );
}

export default SignUp