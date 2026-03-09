import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseInitError } from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const requireAuth = () => {
    if (!auth) throw new Error(firebaseInitError || "Firebase Authentication is not configured.");
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      login: (email, password) => {
        requireAuth();
        return signInWithEmailAndPassword(auth, email, password);
      },
      register: (email, password) => {
        requireAuth();
        return createUserWithEmailAndPassword(auth, email, password);
      },
      logout: () => {
        if (!auth) return Promise.resolve();
        return signOut(auth);
      },
    }),
    [currentUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
