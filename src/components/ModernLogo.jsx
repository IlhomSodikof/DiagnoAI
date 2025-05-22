import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ModernLogo = () => {
  const logoRef = useRef(null);
  const circleRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // Logo entrance animation
    gsap.from(logoRef.current, {
      duration: 1.2,
      opacity: 0,
      y: 40,
      ease: "back.out(1.7)"
    });

    // Circle animation
    gsap.from(circleRef.current, {
      duration: 1.5,
      scale: 0,
      rotation: 360,
      ease: "elastic.out(1, 0.5)"
    });

    // Letters animation
    gsap.from(lettersRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.08,
      delay: 0.4,
      ease: "power3.out"
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  return (
    <div ref={logoRef} className="flex items-center justify-center gap-4">
      {/* Animated Circle */}
      {/* <div
        ref={circleRef}
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-400/30"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping-slow opacity-70"></div>
      </div> */}

      {/* Logo Text */}
      <div className="flex">
        {['D', 'I', 'A', 'G', 'N', 'O', ' ', 'A', 'I'].map((letter, index) => (
          <span
            key={index}
            ref={addToRefs}
            className={`text-transparent bg-clip-text bg-gradient-to-r  [background-image:linear-gradient(to_right,_#6796bd_30%,_#fb0303_100%)]
              text-8xl font-black

              ${index === 0 ? 'ml-2' : ''}

            `}
            style={{
              textShadow: index >= 7
                ? index == 7 ? '0 0 4px' : '0 0 4px rgba(245, 7, 7, 0.7)'
                : '0 0 8px rgba(34, 211, 238, 0.7)'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ModernLogo;