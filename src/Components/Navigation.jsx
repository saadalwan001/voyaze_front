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
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center mr-4">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* DESKTOP NAVIGATION - show only on lg+ */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="relative text-white font-medium pb-1 transition group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* MOBILE/TABLET MENU TOGGLE - show on md and below */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} color="gray" /> : <Menu size={24} color="gray" />}
          </button>
        </div>
      </div>

      {/* MOBILE/TABLET MENU */}
      <div
        className={`lg:hidden bg-white shadow-md border-t border-gray-200 overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium"
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
