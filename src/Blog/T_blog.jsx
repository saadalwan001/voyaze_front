import React from 'react'
import Nav from "@/Components/about/A_naviagtion";
import Cover from "@/Components/A_Cover.jsx";
import image from "/blogimg.jpg";
import Blog from "@/Components/blog/Blog_part.jsx";
import Footer from '@/Components/Footer';

 function T_blog() {
  return (
    <>
    <Nav/>
    <Cover 
    backgroundImage={image}
    title="Blogs"
    />
    <Blog/>
    <Footer/>





    </>
  )
};

export default T_blog;
