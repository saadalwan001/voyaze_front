import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import Home from "@/home.jsx";
import About from "@/AboutUs/Aboutus.jsx";
import Tour from "@/Tour/TourPack.jsx";
import Attraction from "@/Attraction/Attraction.jsx";
import Destination from "@/Destination/Destination.jsx";
import Blog from "@/Blog/T_blog.jsx";
import Contact from "@/Contact/Contact.jsx";
import Login from "@/Admin/Login.jsx";
import Dashboard from "@/Admin/Dashboard.jsx";
import A_package from "@/Admin/Admin_Tour_Package.jsx";
import PackageDetails from "./Tour/PackageDetails";
import Admin_Tour_Packge_Card from '@/Admin/Admin_Tour_Packge_Card.jsx';
import Admin_Edit_Tour_Package from '@/Admin/Admin_Edit_Tour_Package.jsx';
import Admin_AddAttraction from "./Admin/Admin_AttractionAdd_Page";


import ProtectedRoute from "@/ProtectedRoute.jsx";


 function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tour/>} />
        <Route path="/attraction" element={<Attraction/>}/>
        <Route path="/destinations" element={<Destination/>}/>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path ="/contact" element={<Contact/>}/> 
        <Route path="/admin-login" element={<Login/>}/>
        <Route path="/package/:id" element={<PackageDetails/>}/>
        



        {/* Login Route (accessible only if not logged in) */}
      <Route 
        path="/admin-login" 
        element={
          !localStorage.getItem("admin_token") ? <Login /> : <Dashboard />
        } 
      />
        
        {/*Protected Route Section*/}
        <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

       {/* Package Management (cards) */}
      <Route
        path="/admin-packcards"
        element={
          <ProtectedRoute>
            <Admin_Tour_Packge_Card/>
          </ProtectedRoute>
        }
      />

       {/* Package Edit (cards) */}
      <Route
        path="/admin-editcards/:id"
        element={
          <ProtectedRoute>
            <Admin_Edit_Tour_Package/>
          </ProtectedRoute>
        }
      />

      {/*Attraction & Experienc adding page */}
      <Route
        path="/admin-attraction"
        element={
          <ProtectedRoute>
            <Admin_AddAttraction/>
          </ProtectedRoute>
        }
      />


      <Route path="/admin-packages" element={<ProtectedRoute><A_package/></ProtectedRoute>}/>
      
    </Routes>
  )
}

export default AppRoutes;