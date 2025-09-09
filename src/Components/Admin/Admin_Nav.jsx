import React, {useState, useEffect} from "react";
import {Menu, X} from "lucide-react";
import {Link, useNavigate } from "react-router-dom";


 function Admin_Nav() {
    const[isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        {name: "Tour Packages", href:"/admin-packcards"},
        {name: "Attraction & Experience", href:"/admin-attraction/cards"},
        {name: "Blogs", href:"/admin-all-blogs"},
        {name: "Contact", href:"/admin-contact"},
        {name: "Profile", href:"/admin-profile"},
        
    ];

    // Logout function
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_info");
    navigate("/admin-login"); // redirect to login page
  };


    useEffect(()=>{
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
        <Link to="/admin-dashboard" className="flex items-center mr-4">
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
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2  text-red-600 font-bold rounded hover:bg-red-700  hover:text-white transition"
          >
            Logout
          </button>
        </nav>

        {/* === MOBILE MENU TOGGLE === */}
        <div className="md:hidden">
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
              className="block text-gray-700 hover:[#024360] font-medium hover:text-[#024360]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Admin_Nav;
    


