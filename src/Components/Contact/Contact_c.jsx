import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram
} from "lucide-react";

function ContactUs() {
  return (
    <section className=" w-ful py-10 px-4 sm:px-8 lg:px-16 mt-[50px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-y-8 gap-x-5  items-start" >


        {/* Right Column - Contact Info */}
        <div className="flex flex-col justify-center space-y-10">


          {/* Card 1 */}
    <div className="flex items-center bg-white p-4 rounded-lg border border-gray-300 h-35 group transition-colors">
  <div className="flex items-center justify-center w-25 h-14 rounded-full  bg-gray-50  text-gray-500 mr-4 transition-all duration-300 group-hover:border-white group-hover:bg-[#E8604C]">
    <MapPin className="w-9 h-7 text-gray-500 group-hover:text-white" />
  </div>
  <div>
    <h3 className="font-bold text-lg">Address</h3>
    <p className="text-gray-600">
      65/5 Rajamaha Vihara Road, Mirihana, Pitakotte
    </p>
  </div>
</div>





          {/* Card 2 */}
          <div className="flex items-center bg-white p-4 rounded-lg border border-gray-300 h-35 group transition-colors ">
            <div className="flex items-center justify-center w-14 h-14 rounded-full  bg-gray-50  text-gray-500 mr-4 transition-all duration-300 group-hover:border-white group-hover:bg-[#E8604C]">

            <Phone className="w-9 h-7 text-gray-500 group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Phone</h3>
              <p className="text-gray-600">+94 77 337 5642</p>
              <p className="text-gray-600">+94 70 707 0653</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center bg-white p-4 rounded-lg border border-gray-300 h-35 group transition-colors">
            <div className="flex items-center justify-center w-14 h-14 rounded-full  bg-gray-50  text-gray-500 mr-4 transition-all duration-300 group-hover:border-white group-hover:bg-[#E8604C]">
            <Mail className="w-9 h-7 text-gray-500 group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-gray-600">info@voyaztravel.com</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
  {/* Facebook */}
  <a href="#" className="group">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 text-gray-500 transition-all duration-300 border border-gray-300 group-hover:border-white group-hover:bg-[#E8604C]">
      <Facebook className="w-9 h-7 text-gray-500 group-hover:text-white" />
    </div>
  </a>

  {/* Instagram */}
  <a href="#" className="group">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 text-gray-500 transition-all duration-300 border border-gray-300 group-hover:border-white group-hover:bg-[#E8604C]">
      <Instagram className="w-9 h-7 text-gray-500 group-hover:text-white" />
    </div>
  </a>
</div>
        </div>



        {/* Left Column - Form */}
        <div className=" p-6 sm:p-8 rounded-lg">
          <h2 className=" text-[50px] sm:text-3xl font-bold mb-6 -mt-10">
            Contact Us By Sending A Message
          </h2>
          <form className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                 <span className="text-gray-400">*</span> Name 
                </label>
                <input
                  type="text"
                  size={40}
                  maxLength={400}
                  placeholder="Enter Your Name"
                  required
                  className=" mt-1 block w-full border-none focus:outline-none h-[70px] bg-[#E0F4FF] border-gray-300 rounded-md p-2 text-[#75798B]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-gray-400">*</span> Email 
                </label>
                <input
                  type="email"
                  size={40}
                  maxLength={400}
                  placeholder="Enter Your Email"
                  required
                  className="mt-1 block w-full border-none focus:outline-none h-[70px] bg-[#E0F4FF] border-gray-300 rounded-md p-2 text-[#75798B]"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile No or Whatsapp No:
                </label>
                <input
                  type="tel"
                  size={40}
                  maxLength={400}
                  placeholder="Enter Your Mobile Number"
                  className="mt-1 block w-full border-none focus:outline-none h-[70px] bg-[#E0F4FF] border-gray-300 rounded-md p-2 text-[#75798B]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-gray-400">*</span> Country 
                </label>
                <input
                  type="text"
                  size={40}
                  maxLength={400}
                  placeholder="Enter Your Country"
                  required
                  className="mt-1 block w-full border-none focus:outline-none h-[70px] bg-[#E0F4FF] border-gray-300 rounded-md p-2 text-[#75798B]"
                />
              </div>
            </div>

            {/* Row 3 - Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Arrival Date:
                </label>
                <input
                  type="date"
                  
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Departure Date:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="10"
                cols="40"
                placeholder="Enter Your Message"
                className="mt-1 block w-full border-none focus:outline-none bg-[#E0F4FF] border-gray-300 rounded-md p-5 text-[#75798B]"
              ></textarea>
            </div>

            {/* Required Fields Note */}
            <p className="text-sm text-gray-500">Required Fields *</p>

            {/* Button */}
            <button
              type="submit"
              className="bg-[#03567F] text-white font-medium  text-sm sm:text-md px-5  sm:px-6 sm:py-4  rounded hover:bg-[#024360] transition-all "
            >
              Send A Message
            </button>
          </form>
        </div>

        

      </div>
    </section>
  );
}

export default ContactUs;
