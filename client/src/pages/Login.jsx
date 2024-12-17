import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(id, password);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <div className="absolute top-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800 mb-2">
          Blockchain Voting System
        </h1>
        <div className="h-1 w-32 mx-auto bg-primary-500/50 rounded-full backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl w-full flex items-center justify-between">
        {/* Left side - SVG Illustration */}
        <div className="hidden lg:block w-1/2 pr-12">
          <img
            src="/undraw_fingerprint_re_uf3f.svg"
            alt="Security"
            className="w-full h-auto transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            style={{
              filter: "drop-shadow(0px 10px 20px rgba(99, 102, 241, 0.2))",
              maxWidth: "500px",
            }}
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 lg:pl-12">
          <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-auto animate-enter">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-display font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 font-body">
                Please sign in to continue
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100/80 backdrop-blur-sm text-red-700 p-3 rounded-lg text-sm font-body animate-enter">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-gray-700 font-body mb-2"
                    htmlFor="id"
                  >
                    User ID
                  </label>
                  <input
                    id="id"
                    type="text"
                    required
                    className="input-field w-full px-4 py-3 rounded-lg font-body"
                    placeholder="Enter your ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-body mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="input-field w-full px-4 py-3 rounded-lg font-body"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`glass-button w-full py-3 px-4 rounded-lg text-primary-700 font-display font-semibold
                       ${
                         isLoading
                           ? "opacity-75 cursor-not-allowed"
                           : "hover:animate-glow"
                       }`}
              >
                {isLoading ? (
                  <span className="loading-dots">Signing In</span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
