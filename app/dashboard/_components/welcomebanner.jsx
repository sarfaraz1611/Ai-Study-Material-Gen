import React from 'react';
import { Monitor } from 'lucide-react';

const GamePlayWelcomeBanner = () => {
  return (
    <div className="w-full p-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Background pattern circles */}
        <div className="absolute right-8 top-4 opacity-20">
          <div className="w-32 h-32 rounded-full border-4 border-white"></div>
        </div>
        <div className="absolute right-16 bottom-6 opacity-15">
          <div className="w-20 h-20 rounded-full border-4 border-white"></div>
        </div>
        <div className="absolute right-32 top-12 opacity-10">
          <div className="w-16 h-16 rounded-full border-4 border-white"></div>
        </div>
        <div className="absolute right-4 bottom-16 opacity-25">
          <div className="w-12 h-12 rounded-full border-4 border-white"></div>
        </div>
        <div className="absolute right-28 bottom-2 opacity-20">
          <div className="w-8 h-8 rounded-full border-4 border-white"></div>
        </div>
        
        {/* Main content */}
        <div className="flex items-center gap-6 relative z-10">
          {/* Laptop icon */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Hello, Game Play</h1>
            <p className="text-lg text-blue-100">
              Welcome Back, Its time to get back and start learning new course
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayWelcomeBanner;