import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ModernLogo from '../components/ModernLogo';
import Logo from '../assets/logo.png';
import ChatPage from './ChatPage';


const Hero = () => {
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Nodira Karimova',
      specialty: 'Nevrolog',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Dr. Sanjar Tursunov',
      specialty: 'Gastroenterolog',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
      id: 3,
      name: 'Dr. Dilshod Raximov',
      specialty: 'Kardiolog',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    }
  ];

  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current.children, {
      duration: 1,
      opacity: 0,
      y: 30,
      stagger: 0.15,
      ease: "power3.out"
    });

    // CTA button hover effect
    gsap.to(ctaRef.current, {
      duration: 3,
      backgroundPosition: '100% 50%',
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Stats cards animation
    gsap.from(statsRef.current.children, {
      duration: 1,
      opacity: 0,
      y: 40,
      stagger: 0.1,
      delay: 0.8,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <section
      className="relative min-h-screen  w-[100%] overflow-hidden   "
    // style={{
    //   background: 'radial-gradient(circle at 10% 20%, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 90%)'
    // }}
    >
      {/* Floating gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl"></div>
      </div>

      <div ref={heroRef} className="relative z-10 container mx-auto  py-10">
        <div className="flex flex-col items-center">
          {/* Modern Logo */}
          <img className='w-46 h-46' src={Logo} alt="logo" />
          <ModernLogo />

          {/* Main Heading */}
          <h1 className="mt-8 text-xl md:text-5xl font-extrabold text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r [background-image:linear-gradient(to_right,_#fb0303_1%,_#6796bd_70%)]">
              sog'lig'ingiz uchuna aqlli hamroh
            </span>{' '}
            <br />

          </h1>

          {/* Subheading */}
          <p className="mt-7 text-xl text-center text-gray-400 max-w-3xl leading-relaxed">
            Bizning chuqur o'rganish platformamiz tibbiy ma'lumotlarni 96,3% aniqlik bilan tahlil qiladi va sizga tez va aniq malumot beradi.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            <button
              ref={ctaRef}
              className="relative px-12 py-3 text-white font-bold rounded-4xl overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
                backgroundSize: '300% 100%',
                boxShadow: '0 10px 30px -5px rgba(6, 182, 212, 0.5)'
              }}
            >
              <span className="relative z-10 flex items-center">
                AI diagnostikasi
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-12 py-3 bg-transparent hover:bg-gray-800/50 text-cyan-400 font-bold rounded-4xl border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 group">
              <span className="flex items-center">
                U qanday ishlaydi

                <span className="ml-3 inline-block group-hover:rotate-90 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Stats Cards */}
          <div ref={statsRef} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "96.3%", label: "Aniqlik", color: "from-cyan-400 to-blue-500" },
              { value: "12.8k", label: "Kundalik holatlar", color: "from-purple-400 to-pink-500" },
              { value: "240+", label: "Shartlar", color: "from-blue-400 to-indigo-500" },
              { value: "0.2s", label: "Oʻrtacha Javob", color: "from-emerald-400 to-teal-500" }
            ].map((stat, index) => (
              <div
                key={index}
                className="relative p-4 rounded-2xl overflow-hidden  "
                style={{
                  // background: 'rgba(15, 23, 42, 0.4)',
                  // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
                }}
              >
                {/* <div className="absolute -inset-1 bg-gradient-to-r opacity-20 blur-md"></div> */}
                <div className="relative z-10">
                  <div className={`text-4xl font-bold text-center bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="mt-2 text-gray-300 text-center">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* <ChatPage doctor={mockDoctors[0]} onBack={() => navigate('/')} /> */}
      {/* Animated scanning line */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-scan"></div> */}
    </section>
  );
};

export default Hero;