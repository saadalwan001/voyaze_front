import React from 'react'
import Nav from '@/Components/about/A_naviagtion';
import Cover from '@/Components/A_Cover';
import Att from '/attraction.jpg'
import Image from '@/Components/attraction/image.jsx'
import Footer from '@/Components/Footer';


 function Attraction() {
  return (
    <>
    <Nav/>
    <Cover 
    backgroundImage={Att}
    title="Attraction And Experiences"
    
    />
    <Image/>
    <Footer/>

    </>
  )
};

export default Attraction;
