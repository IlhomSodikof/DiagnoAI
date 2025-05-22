import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Pastga skroll qilyapti, navbarni yashiramiz
        setShowNavbar(false);
      } else {
        // Tepaga skroll qilyapti, navbarni ko'rsatamiz
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[999999] mx-4 flex items-center justify-between rounded-full bg-white px-4 py-2 text-black transition duration-1000  md:px-12   ${showNavbar ? "translate-y-0" : "-translate-y-24"}`}
      id="navbar"
    >
      {/* Logo and Brand Name */}
      <Link to={"/"} className="flex  items-center gap-1 md:gap-5">
        {/* Logo Image */}
        {/* <img src="./assets/logo.png" className="h-fit w-4 md:w-8" alt="Company Logo" /> */}
        {/* Brand Name */}
        <h5 className="font-sans font-bold text-2xl text-black flex w-48 my-4">Diagno Ai</h5>
      </Link>

      {/* Mobile Menu Toggle Icon */}
      <label htmlFor="nav-check" className="md:hidden">
        <i className="fa fa-bars cursor-pointer"></i>
      </label>
      {/* Hidden checkbox to control the mobile menu */}
      <input type="checkbox" className="hidden" id="nav-check" />

      {/* Navigation Links */}
      <ul className="absolute right-0 top-5 -z-10 flex w-full flex-col justify-end gap-10 rounded-b-2xl bg-white px-4 text-right font-medium md:static md:flex-row md:p-0 md:pt-0 md:text-left">
        {/* Individual Navigation Links */}
        <li>
          <Link to="/ptient">Home</Link>
        </li>
        <li>
          <Link to="/rentgen">Rentgen</Link>
        </li>
        <li>
          <Link to='/analysis'>Ekg</Link>
        </li>
        <li>
          <Link to='/manitoring'>Monitoring</Link>
        </li>
        <li>
          <Link to='/testimonials'>RTG</Link>
        </li>
        <li>
          <Link to='/contact'>Tibiy markazlar</Link>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
