import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '@/context/CartContext';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount, setIsCartOpen, isInitialized } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tour Packages", href: "/tours" },
    { name: "Attraction and Experiences", href: "/attraction" },
    { name: "Destination", href: "/destinations" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 border-b
        transition-colors duration-300
        ${scrolled ? "bg-transparent border-gray-300" : "bg-white border-transparent"}
        backdrop-blur-md
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* === LOGO PLACE === */}
        <Link to="/" className="flex items-center mr-4">
          <img src="/about_logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* === DESKTOP NAVIGATION === */}
        <nav className={`hidden md:flex space-x-8 transition-colors duration-300 ${scrolled ? "text-[#024360]" : "text-black"}`}>
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="relative font-medium pb-1 group"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* === CART ICON === */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={!isInitialized}
          >
            {!isInitialized ? (
              <Loader className="w-6 h-6 animate-spin text-gray-400" />
            ) : (
              <>
                <ShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        {/* === MOBILE MENU TOGGLE === */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Mobile Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
            disabled={!isInitialized}
          >
            {!isInitialized ? (
              <Loader className="w-6 h-6 animate-spin text-gray-400" />
            ) : (
              <>
                <ShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </>
            )}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} color={scrolled ? "white" : "black"} /> : <Menu size={24} color={scrolled ? "white" : "black"} />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4 space-y-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              className="block text-gray-700 hover:[#024360] font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navigation;