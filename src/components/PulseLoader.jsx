import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const PulseLoader = ({ loading = true, size = 'lg', color = 'primary' }) => {
  // Ranglar palitrasi
  const colors = {
    primary: 'text-blue-500',
    danger: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    purple: 'text-purple-500'
  };

  // O'lchamlar
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
      <div className="text-center">
        {/* Markaziy yurak ikonkasi */}


        {/* Yuklanmoqda matni */}


        <div className="loading scale-[1.5]">
          <svg height="100px" width="200" viewBox="0 -30 70 100">
            <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
            <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"></polyline>
          </svg>
        </div>
        <p className="mt-10 text-red-500 font-medium animate-pulse">Yuklanmoqda...</p>
      </div>
      <style jsx>{`


        .loading svg {
          display: block;
          // margin: 0 auto;
        }

        .loading svg polyline {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .loading svg polyline#back {
          // stroke: #e0e0e0;
        }

        .loading svg polyline#front {
          stroke: #FF0000;
          stroke-dasharray: 48, 144;
          stroke-dashoffset: 200;
          animation: dash_682 1.4s linear infinite;
        }

        @keyframes dash_682 {
          72.5% {
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PulseLoader;

