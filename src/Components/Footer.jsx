import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckSquare,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white px-6 py-10 ">
      <div className="flex items-center justify-center min-h-[500px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  align-middle">
        
        {/* Column 1 */}
        <div>
          {/* Logo */}
          <img src="/logo.png" alt="Voyaz Travel" className="h-12 mb-4" />

          {/* Divider */}
          <hr className="border-gray-500 mb-4 " />

          {/* Contact Details */}
          <div className="space-y-3 text-[#A9A8B6]">
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-white" /> +94 77 337 5642
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-white" /> +94 70 707 0653
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-white" /> 0112808473
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-white" /> info@voyaztravel.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18}  className="text-white"/> 65/5 Rajamaha Vihara Road, <br/> Mirihana, Pitakotte
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#A9A8B6]">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/packages" className="hover:text-gray-300">Travel Packages</a></li>
            <li><a href="/destinations" className="hover:text-gray-300">Destination</a></li>
            <li><a href="/blogs" className="hover:text-gray-300">Blogs</a></li>
            <li><a href="/attractions" className="hover:text-gray-300">Attractions & Experiences</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <div className="w-max[600px]">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 text-[#A9A8B6] rounded mb-3 bg-black h-[60px] text-center"
          />
          <button
            className="bg-[#075277] text-white px-6 py-2 rounded hover:opacity-90 transition h-[60px] w-full "
          >
            SUBSCRIBE
          </button>
          </div>

          <p className="flex items-center gap-2 mt-3 text-sm text-[#A9A8B6]">
            <CheckSquare size={16} /> I agree to all terms and policies
          </p>
        </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-500 my-6 max-w-[900px] mx-auto" />

      {/* Bottom Text */}
      <p className="text-center  text-white text-l">
        All rights Reserved by © Voyaz Travel | Powered by CoreChip Digital
      </p>
    </footer>
  );
};

export default Footer;
