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
import Admin_AddAttraction from "./Admin/Admin_AttractionAdd_Page.jsx";
import Location from "@/location.jsx";
import Admin_Attraction_Card from "./Admin/Admin_Attraction_Cards.jsx";
import Admin_EditAttraction from "./Admin/Admin_Attraction_Edit.jsx";
import AdminBlogCreate from "./Admin/Admin_CreateBlog.jsx";
import Admin_Blog_Cards from "./Admin/Admin_BlogsCards";
import AdminBlogEdit from "./Admin/Admin_BlogEdit.jsx";
import Each_blog from "./Blog/Blog_Individual.jsx";
import Admin_Contact from "@/Admin/Admin_Contact_Page.jsx";
import Admin_Profile from '@/Admin/Admin_Profile_Page.jsx';


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
        <Route path="/location/:id" element={<Location/>}/>
        <Route path="/blog/:id" element={<Each_blog/>}/>

        



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

      {/*Attraction & Experienc cards */}
      <Route
        path="/admin-attraction/cards"
        element={
          <ProtectedRoute>
            <Admin_Attraction_Card/>
          </ProtectedRoute>
        }
      />

      {/* Package Edit Attraction Cards */}
      <Route
        path="/admin-editattraction/:id"
        element={
          <ProtectedRoute>
            <Admin_EditAttraction/>
          </ProtectedRoute>
        }
      />

        {/* Blog Creation Page */}
      <Route
        path="/admin-create-blogs"
        element={
          <ProtectedRoute>
            <AdminBlogCreate/>
          </ProtectedRoute>
        }
      />

    
       {/* All Blogs  Page */}
      <Route
        path="/admin-all-blogs"
        element={
          <ProtectedRoute>
            <Admin_Blog_Cards/>
          </ProtectedRoute>
        }
      />
      {/*Blogs Edit  Page */}
      <Route
        path="/admin-edit-blogs/:id"
        element={
          <ProtectedRoute>
            <AdminBlogEdit/>
          </ProtectedRoute>
        }
      />

       {/*Contact Page */}
      <Route
        path="/admin-contact"
        element={
          <ProtectedRoute>
            <Admin_Contact/>
          </ProtectedRoute>
        }
      />

      {/*Profile Page */}
      <Route
        path="/admin-profile"
        element={
          <ProtectedRoute>
            <Admin_Profile/>
          </ProtectedRoute>
        }
      />


      <Route path="/admin-packages" element={<ProtectedRoute><A_package/></ProtectedRoute>}/>
      
    </Routes>
  )
}

export default AppRoutes;