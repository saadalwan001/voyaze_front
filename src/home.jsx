import React from 'react'
import Navbar from './Components/Navigation.jsx';
import VideoSection from '@/Components/VideoSlider.jsx';
import Aboutus from '@/Components/Aboutus.jsx';
import Feature from '@/Components/features.jsx';
import Why_page from '@/Components/Why.jsx';
import DesSection from './Components/Destination.jsx';
import Packages from './Components/Packages.jsx';
import Things from './Components/things.jsx';
import Travel from './Components/Travel_blog.jsx';
import GetInTouchSection from '@/Components/Intouch.jsx';
import Footer from './Components/Footer.jsx';
export default function home() {
  return (
    <>
    
      <Navbar/>
      <VideoSection/>
      <Aboutus/>
      <Feature/>
      <Why_page/>
      <DesSection/>
      <Packages/>
      <Things/>
      <Travel/>
      <GetInTouchSection/>
      <Footer/>
   
      
    
    </>
  )
}
