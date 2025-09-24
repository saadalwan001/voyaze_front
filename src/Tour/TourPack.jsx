import React from "react";
import Nav from "@/Components/about/A_naviagtion.jsx";
import Scroll from "@/Components/tours/Scroll.jsx";
import Packages from "@/Components/tours/packages_tour.jsx";
import Footer from "@/Components/Footer";
import CartPopup from "@/Components/common/CartPopup";
function TourPack() {
  return (
    <>
      <Nav />
      <Scroll />
      <Packages />
      <Footer />
      <CartPopup />
    </>
  );
}

export default TourPack;
