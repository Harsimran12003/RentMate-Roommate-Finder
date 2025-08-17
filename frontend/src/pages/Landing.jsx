import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getTestimonials } from "../services/testimonialService"; 

const Landing = () => {
  const [rooms, setRooms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured rooms
        

        // Fetch testimonials using service
        const testiData = await getTestimonials();
        setTestimonials(testiData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-13 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find the <span className="text-[#4e54c8]">right space</span>,<br />
            with the <span className="text-[#4e54c8]">right face</span>.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover roommates and rental spaces that match your lifestyle. RentMate makes finding a home seamless and social.
          </p>
          <Link
            to="/register"
            className="bg-[#4e54c8] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#5c6ac4] transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        <div className="md:w-1/3">
          <img
            src="https://img.freepik.com/free-vector/house-search-concept-illustration_114360-4355.jpg"
            alt="Find Rooms"
            className="w-full h-auto animate-fade-in"
          />
        </div>
      </main>

      {/* Room Listings */}
      <section className="px-8 md:px-20 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#4e54c8]">Featured Rooms</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading rooms...</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={room.image || "https://via.placeholder.com/400x300"}
                  alt={room.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{room.title}</h4>
                  <p className="text-[#4e54c8] font-medium">{room.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="px-8 md:px-20 py-16 bg-gradient-to-br from-[#dbeeff] to-[#ffffff]">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#4e54c8]">What Our Users Say</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading testimonials...</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((user, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.avatar || "https://via.placeholder.com/150"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold">{user.name}</h5>
                    <p className="text-sm text-gray-500">Verified User</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{user.feedback}”</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
