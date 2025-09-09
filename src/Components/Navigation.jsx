import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tour Packages", href: "/tours" },
    { name: "Attraction and Experiences", href: "/attraction" },
    { name: "Destination", href: "/destinations" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-18 md:h-20">
        {/* === LOGO === */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* === DESKTOP NAVIGATION === */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className={`relative font-medium pb-1 transition-all duration-300 group text-sm xl:text-base ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* === MOBILE MENU TOGGLE === */}
        <div className="lg:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle menu"
            className="p-2 rounded-md transition-colors duration-200 hover:bg-white/10"
          >
            {isOpen ? (
              <X
                size={24}
                className={isScrolled ? "text-gray-700" : "text-white"}
              />
            ) : (
              <Menu
                size={24}
                className={isScrolled ? "text-gray-700" : "text-white"}
              />
            )}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg`}
      >
        <div className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-md hover:bg-blue-50 transition-all duration-200 text-sm sm:text-base"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
