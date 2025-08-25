import React from "react";
import Nav from "@/Components/Admin/Admin_Nav.jsx";

export default function AdminDashboard() {
  const stats = [
    { title: "Tour Packages", value: 12, icon: "🛫", color: "bg-blue-500" },
    { title: "Attractions & Experiences", value: 24, icon: "🏞️", color: "bg-green-500" },
    { title: "Blogs", value: 8, icon: "📝", color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Nav />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Admin</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`flex items-center justify-between p-6 rounded-xl shadow-lg ${stat.color} text-white transform transition hover:scale-105`}
            >
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm mt-1">{stat.title}</p>
              </div>
              <div className="text-5xl">{stat.icon}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
