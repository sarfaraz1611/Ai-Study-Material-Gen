"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CheckUserExists();
    }
  }, [user]);

  const CheckUserExists = async () => {
    try {
      console.log("Checking user:", user);
      
      const response = await fetch("/api/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("User check result:", data);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
