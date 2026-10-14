"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async ({ identifier }) => {
    setIsLoading(true);
    // Instant smooth login without external dependencies or blockers
    const activeUser = {
      identifier: identifier || "User",
      email: identifier?.includes("@")
        ? identifier
        : `${identifier || "user"}@apollojbphospitals.com`,
    };
    setUser(activeUser);
    setIsLoading(false);
    router.push("/");
    return { success: true, user: activeUser };
  };

  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    setIsLoading(false);
    router.push("/logout");
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({ success: true }),
      logout: async () => {},
    };
  }
  return context;
}
