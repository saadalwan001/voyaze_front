import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utlis/axios.js";
import Nav from "@/Components/about/A_naviagtion";
import AttractionDetailCard from "@/Components/attraction/AttractionDetailCard.jsx";
import DownSlider from "@/Components/attraction/AttractionSlider.jsx";
import Footer from "./Components/Footer";
import AttractionTourPackages from "./Components/attraction/AttractionTourPackages";

function Location() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    api.get(`/attractions/${id}`)
      .then((res) => setAttraction(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!attraction) return <p className="text-center py-16">Loading...</p>;

  return (

    <div>
        <Nav />
      <AttractionDetailCard
        title={attraction.title}
        description={attraction.description}
        back_img={attraction.back_img}
      />
      <AttractionTourPackages attractionId={id}/>
      <DownSlider/>
      <Footer/>
    </div>
  );
}

export default Location;
