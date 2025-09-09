// src/Components/WhatsAppButton.jsx
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import api from "@/utlis/axios.js";

const WhatsAppButton = () => {
  const [whatsapp, setWhatsapp] = useState(null);
  const location=useLocation();

  //this below line will hide whatsapp logo from admin side pages
  const isAdminRoute = location.pathname.startsWith("/admin-");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/company-contact"); 
        if (res.data?.whatsapp) {
          setWhatsapp(res.data.whatsapp);
        }
      } catch (err) {
        console.error("Error fetching WhatsApp number:", err);
      }
    };

    fetchContact();
  }, []);

  if (isAdminRoute || !whatsapp) return null; // button will not be visible if w_num is not available

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-green-600 transition z-50"
    >
      <FaWhatsapp size={40} />
    </a>
  );
};

export default WhatsAppButton;
