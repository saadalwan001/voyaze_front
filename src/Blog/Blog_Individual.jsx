import React from 'react'
import Nav from "@/Components/about/A_naviagtion";
import Cover from "@/Components/A_Cover.jsx";
import image from "/tour.jpg"
import Blog from "@/Components/blog/BlogDetails.jsx"


export default function Blog_Individual() {
  return (
<>
<Nav/>
<Cover 
    backgroundImage={image}/>

<Blog/>
</>

  )
}
