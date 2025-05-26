import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import ProfileDropdown from './ProfileDropdown ';

const Navbar = () => {
  const user = {
    name: "Aliyev Sherzod",
    email: "+998901234567",
    role: "Admin",
    avatar: "" // Agar rasm bo'lsa URL ni yozing
  };
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
      className={`navbar fixed left-0 right-0 top-0 z-[999999] mx-4 flex items-center justify-between rounded-full bg-white px-4 py-2 text-black transition duration-1000  md:px-12   ${showNavbar ? "translate-y-0" : "-translate-y-24"}`}
      id="navbar"
    >
      {/* Logo and Brand Name */}
      <Link to={"/home"} className="flex  items-center gap-1 md:gap-5">
        {/* Logo Image */}
        {/* <img src="./assets/logo.png" className="h-fit w-4 md:w-8" alt="Company Logo" /> */}
        {/* Brand Name */}
        <h5 className="font-sans font-bold text-2xl text-black flex w-48 my-4">Diagno Ai Lab</h5>
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

        {/*

        <li>
          <Link to='/monitoring'>Monitoring</Link>
        </li>
        <li>
          <Link to='/labaratory'>Laboratoriya analizlari</Link>
          <Link to='/parmacy'>Online Dorixona</Link>
        </li>

        <li>
          <Link to='/contact'>Tibbiy markazlar</Link>

        </li> */}
        <li>
          <Link ><ProfileDropdown user={user} /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
