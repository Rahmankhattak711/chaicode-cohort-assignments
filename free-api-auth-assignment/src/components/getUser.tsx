import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("accessToken");

  const fetchUserData = async () => {
    const token = getToken();
    if (!token) {
      toast.error("No token found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserData(data.data || data);
      } else {
        toast.error(data.message || "Failed to fetch user data");
        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = getToken();
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.ok) {
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed on server");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local data and redirect
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading user profile...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
            {/* Avatar */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl mb-6 border-4 border-white/20">
              👤
            </div>

            <h2 className="text-3xl font-bold text-white mb-1">
              {userData?.username || "User"}
            </h2>
            <p className="text-slate-400 mb-8">{userData?.email}</p>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left space-y-4">
              <div>
                <p className="text-slate-400 text-sm">Username</p>
                <p className="text-white font-medium">{userData?.username}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-medium">{userData?.email}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Role</p>
                <p className="text-white font-medium capitalize">
                  {userData?.role || "USER"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
