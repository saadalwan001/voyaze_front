import React from 'react'
import Nav from '@/Components/about/A_naviagtion.jsx'
import Cover from '@/Components/A_Cover.jsx'
import Img from '/sigiriyaback.webp'
import Con from '@/Components/Contact/Contact_c.jsx';

 function Contact() {
  return (
    <>
    <Nav/>
    <Cover
    backgroundImage={Img}
    title = "Get In Touch With Us"
    />
    <Con/>
    
    
    </>
    
  )
}

export default Contact;
