import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] text-gray-800">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find the <span className="text-[#4e54c8]">right space</span>,<br />with the <span className="text-[#4e54c8]">right face</span>.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover roommates and rental spaces that match your lifestyle. RentMate makes finding a home seamless and social.
          </p>
          <Link to="/register" className="bg-[#4e54c8] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#5c6ac4] transition-transform transform hover:scale-105">
            Get Started
          </Link>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/house-search-concept-illustration_114360-4355.jpg"
            alt="Find Rooms"
            className="w-full h-auto animate-fade-in"
          />
        </div>
      </main>

      {/* Room Listings Section */}
      <section className="px-8 md:px-20 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#4e54c8]">Featured Rooms</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "2BHK Apartment in Mumbai",
              price: "₹15,000/mo",
              img: ""
            },
            {
              title: "Shared Flat in Bangalore",
              price: "₹8,500/mo",
              img: ""
            },
            {
              title: "Private Room in Delhi",
              price: "₹10,000/mo",
              img: ""
            }
          ].map((room, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={room.img} alt={room.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{room.title}</h4>
                <p className="text-[#4e54c8] font-medium">{room.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 md:px-20 py-16 bg-gradient-to-br from-[#dbeeff] to-[#ffffff]">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#4e54c8]">What Our Users Say</h3>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              name: "Aditi Sharma",
              feedback: "RentMate helped me find the perfect roommate and saved a lot of time. The platform is super easy to use!",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              name: "Rahul Mehra",
              feedback: "I was new to the city and RentMate made it feel like home instantly. Found an affordable place within 2 days!",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              name: "Sneha Kapoor",
              feedback: "The best platform for rental search! I loved the way listings are displayed and filtered.",
              avatar: "https://randomuser.me/api/portraits/women/68.jpg"
            }
          ].map((user, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h5 className="font-semibold">{user.name}</h5>
                  <p className="text-sm text-gray-500">Verified User</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{user.feedback}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Landing;
