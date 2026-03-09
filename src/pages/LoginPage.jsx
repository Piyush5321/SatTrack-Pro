import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { firebaseInitError } from "../firebase/config";

function getAuthErrorMessage(err) {
  const code = err?.code || "";
  const msg = err?.message || "";

  if (msg.includes("Firebase config is invalid")) return msg;
  if (code === "auth/api-key-not-valid") {
    return "Invalid Firebase API key. Update VITE_FIREBASE_* values in .env and restart npm run dev.";
  }
  if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
    return "Invalid email or password.";
  }
  if (code === "auth/wrong-password") {
    return "Incorrect password.";
  }
  if (code === "auth/email-already-in-use") {
    return "This email is already registered. Try Login.";
  }
  if (code === "auth/invalid-email") {
    return "Please enter a valid email address.";
  }
  if (code === "auth/weak-password") {
    return "Password should be at least 6 characters.";
  }

  return msg || "Authentication failed.";
}

export default function LoginPage() {
  const { login, register, currentUser } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6 shadow-neon backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-cyan-100">SatTrack Pro</h1>
        <p className="mt-1 text-sm text-slate-400">
          {mode === "login" ? "Login to mission control" : "Create operator account"}
        </p>
        {firebaseInitError && (
          <p className="mt-3 rounded-lg border border-rose-400/30 bg-rose-500/10 p-2 text-xs text-rose-200">
            {firebaseInitError}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
            />
          </div>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500/20 px-4 py-2 font-medium text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}
          className="mt-4 text-sm text-cyan-300 hover:text-cyan-200"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
