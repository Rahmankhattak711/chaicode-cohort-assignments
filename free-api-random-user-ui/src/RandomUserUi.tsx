import { useEffect, useState } from "react";

interface User {
  id: number;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
  };
  nat: string;
}

export default function RandomUserUi() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="h-12 w-12 rounded-full border-4 border-slate-600 border-t-white animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              User Profiles
            </h1>
            <p className="text-slate-400 mt-2">
              Explore modern random user cards
            </p>
          </div>

          <button
            onClick={fetchUsers}
            className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition"
          >
            Refresh Users
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user, index) => (
            <div
              key={user.id || index}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

              {/* Profile */}
              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={user.picture.large}
                    alt={user.name.first}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
                  />

                  <div>
                    <h2 className="text-xl font-semibold leading-tight">
                      {user.name.first} {user.name.last}
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      {user.location.city}, {user.location.country}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-6 space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">Email</p>
                    <p className="text-sm break-all">{user.email}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400">Nationality</p>
                      <p className="font-medium">{user.nat}</p>
                    </div>

                    <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
