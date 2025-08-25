import React from 'react';
import Nav from '@/Components/about/A_naviagtion.jsx';
import Scroll from '@/Components/A_Cover'
import ThisIsUs from '@/Components/about/ThisIsUs';
import MissionVision from '@/Components/about/MissionVision';
import Features from '@/Components/Features.jsx';
import GetInTouchSection from '@/Components/Intouch.jsx';
import Footer from '@/Components/Footer';
import AboutCover from '/about_cover.jpg'

export default function Aboutus() {
  return (
    <>
      <Nav/>
      <Scroll 
      backgroundImage={AboutCover}
      title="Welcome To Voyaz Travel"
       />
      <ThisIsUs/>
      <MissionVision/>
      <Features/>
      <GetInTouchSection/>
      <Footer/>
    </>
  )
}

