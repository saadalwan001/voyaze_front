import React from 'react'
import Nav from '@/Components/about/A_naviagtion.jsx'
import Scroll from '@/Components/A_Cover';
import Image from '/destination.jpg';
import Dest from '@/Components/destination/Destination_img.jsx';
import Footer from '@/Components/Footer';

 function Destination() {
  return (
    <>
    <Nav/>
    <Scroll
    backgroundImage={Image}
    title="Destinations"
    />
    <Dest/>
    <Footer/>


    </>
  )
};

export default Destination;
