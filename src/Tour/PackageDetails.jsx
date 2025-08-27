import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utlis/axios.js";
import PackageHeader from "@/Components/tours/PackageHeader.jsx";
import Nav from "@/Components/about/A_naviagtion.jsx";
import Itinerary from "@/Components/tours/Itinerary.jsx";
import IncludeExcludeList from "@/Components/tours/Include_Exclude.jsx";
import MailForm from "@/Components/MailForm";
import Footer from "@/Components/Footer";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState("itinerary"); // "itinerary" or "includes"

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/packages/${id}`);
        setPackageData(res.data);
      } catch (err) {
        console.error("Error fetching package:", err);
      }
    };
    fetchPackage();
  }, [id]);

  if (!packageData) return <p>Loading...</p>;

  return (
    <>
      <Nav />
      <div className="mt-10 py-16">
        <PackageHeader
          title={packageData.title}
          total_days={packageData.total_days}
          description={packageData.description}
          main_image={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${packageData.main_image}`}
          sub_image1={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${packageData.sub_image1}`}
          sub_image2={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${packageData.sub_image2}`}
          sub_image3={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${packageData.sub_image3}`}
          sub_image4={`${import.meta.env.VITE_API_URL.replace(
            "/api",
            ""
          )}${packageData.sub_image4}`}
        />
      </div>

      {/* Tabs */}
      <div className="  mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 border-b border-gray-300">
        
        <button
          onClick={() => setActiveTab("itinerary")}
          className={`pb-2 font-medium ${
            activeTab === "itinerary"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Itinerary
        </button>
        
        <button
          onClick={() => setActiveTab("includes")}
          className={`pb-2 font-medium ${
            activeTab === "includes"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Includes / Excludes
        </button>
        
      </div>

      {/* Tab Content */}
      <div className="  mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === "itinerary" && (
          <Itinerary  itineraries={packageData.itineraries} />
        )}

        {activeTab === "includes" && (
  <IncludeExcludeList
    included_items={packageData.included_items || []}
    excluded_items={packageData.excluded_items || []}
  />
          


)}
      </div>
      <MailForm packageTitle={packageData.title}/>
      <Footer/>
    </>
  );
};

export default PackageDetails;
