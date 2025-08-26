import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utlis/axios.js";
import PackageHeader from "@/Components/tours/PackageHeader.jsx";
import Nav from '@/Components/about/A_naviagtion.jsx'
import Itinerary from "@/Components/tours/Itinerary.jsx";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

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
    <Nav/>
    <div className=" mt-10 py-16">
      <PackageHeader
        title={packageData.title}
        total_days={packageData.total_days}
        description={packageData.description}
        main_image={`${import.meta.env.VITE_API_URL.replace("/api", "")}${packageData.main_image}`}
        sub_image1={`${import.meta.env.VITE_API_URL.replace("/api", "")}${packageData.sub_image1}`}
        sub_image2={`${import.meta.env.VITE_API_URL.replace("/api", "")}${packageData.sub_image2}`}
        sub_image3={`${import.meta.env.VITE_API_URL.replace("/api", "")}${packageData.sub_image3}`}
        sub_image4={`${import.meta.env.VITE_API_URL.replace("/api", "")}${packageData.sub_image4}`}
      />
    </div>
    {/* Itinerary Tab */}
<div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  <span className="text-[20px] md:text-lg  font-normal text-blue-600">
      Itinerary
    </span>
  <div className="w-15 h-0.5  bg-blue-600 rounded mt-3 "></div>

  {/* Optional: thin line below tab */}
  <hr className="border-gray-200  mb-2 max-w-[870px]" />
</div>

{/* Calling Itinerary */}
<Itinerary itineraries={packageData.itineraries}/>
    </>
  );
};

export default PackageDetails;
