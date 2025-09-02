"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="relative p-8 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 w-full text-white rounded-2xl overflow-hidden shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-12 right-8 w-16 h-16 bg-white rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-8 left-12 w-12 h-12 bg-white rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full animate-pulse animation-delay-500"></div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="relative z-10 flex items-center gap-8">
        {/* Enhanced laptop image container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
            <Image
              src={"/laptop.png"}
              alt="laptop"
              width={100}
              height={100}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Enhanced text content */}
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <h2 className="font-bold text-4xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
              Hello, {user?.fullName || "there"}! 👋
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
          </div>

          <p className="text-blue-50 text-lg leading-relaxed font-medium">
            It's time to get back and start learning new courses ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
