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

      <div className="flex">
        {['D', 'I', 'A', 'G', 'N', 'O', ' ', 'A', 'I', 'L', 'A', 'B'].map((letter, index) => (
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