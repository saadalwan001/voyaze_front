import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, CheckSquare } from "lucide-react";
import api from "@/utlis/axios.js"; // your axios instance

const Footer = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/company-contact"); // your API route
        setContact(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <footer className="bg-[#2C2C2C] text-white px-6 py-10">
        <p className="text-center">Loading contact info...</p>
      </footer>
    );
  }

  return (
    <footer className="bg-[#2C2C2C] text-white px-6 py-10 ">
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 align-middle">
          
          {/* Column 1: Contact */}
          <div>
            <img src="/logo.png" alt="Voyaz Travel" className="h-12 mb-4" />
            <hr className="border-gray-500 mb-4 " />

            <div className="space-y-3 text-[#A9A8B6]">
              {contact?.phone1 && (
                <a
                  href={`tel:${contact.phone1}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone size={18} className="text-white" /> {contact.phone1}
                </a>
              )}
              {contact?.phone2 && (
                <a
                  href={`tel:${contact.phone2}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone size={18} className="text-white" /> {contact.phone2}
                </a>
              )}
              {contact?.land_p && (
                <a
                  href={`tel:${contact.land_p}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone size={18} className="text-white" /> {contact.land_p}
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Mail size={18} className="text-white" /> {contact.email}
                </a>
              )}
              {contact?.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    contact.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <MapPin size={18} className="text-white" /> {contact.address}
                </a>
              )}
              {contact?.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone size={18} className="text-white" /> WhatsApp:{" "}
                  {contact.whatsapp}
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="ml-25 ">
            <h3 className="text-lg font-semibold mb-4 ">Quick Links</h3>
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

          {/* Column 3: Newsletter */}
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

      <hr className="border-gray-500 my-6 max-w-[900px] mx-auto" />
      <p className="text-center text-white text-l">
        All rights Reserved by © Voyaz Travel | Powered by CoreChip Digital
      </p>
    </footer>
  );
};

export default Footer;
