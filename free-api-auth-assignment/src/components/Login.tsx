import React from "react";
import toast, { Toaster } from "react-hot-toast";

const userRoles = ["ADMIN"];

export default function Login() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    role: userRoles[0],
  });

  const [loading, setLoading] = React.useState(false);

  const submitLoginHandler = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful! Welcome back 🎉");
        console.log("Login success:", data);
      } else {
        toast.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Toaster position="top-center" richColors closeButton />

      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🔑</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400 mt-2">Sign in to continue</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitLoginHandler();
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="doejohn"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              Don't have an account?{" "}
              <a href="/Register" className="text-purple-400 hover:text-purple-300 font-medium">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
