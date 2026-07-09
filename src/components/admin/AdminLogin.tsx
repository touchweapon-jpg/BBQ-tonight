import React, { useState } from "react";
import { Lock, User, AlertCircle, Sparkles } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // Simple hardcoded secure admin credentials
      if (username.toLowerCase() === "admin" && password === "admin123") {
        localStorage.setItem("bbq_admin_session", "true");
        onLoginSuccess();
      } else {
        setError("Invalid username or password. (Hint: admin / admin123)");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 rounded-2xl text-emerald-500 mb-4 border border-emerald-500/10 shadow-sm">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
          BBQ Tonight
        </h2>
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-500 font-semibold">
          Gourmet Administration Gate
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-[2rem] border border-neutral-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-start space-x-2.5">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Secure Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F5]/40 border border-gray-250 rounded-xl pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl uppercase text-xs tracking-wider transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Unlocking Portal..." : "Enter Workspace"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 font-medium">
              Demo Access: <span className="font-mono text-gray-600">admin</span> / <span className="font-mono text-gray-600">admin123</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
