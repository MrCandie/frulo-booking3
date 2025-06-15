import React, { useEffect } from "react";
import AppStack from "./app";
import AuthStack from "./auth";
import { useAuth } from "../context/auth";

export default function Screen() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
