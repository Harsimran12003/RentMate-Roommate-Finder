import React from "react";
import { FaHome, FaUsers, FaShieldAlt, FaBolt } from "react-icons/fa";

const About = () => {
  return (

    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-6 py-12">
        
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-10">
          About RentMate
        </h1>

        {/* Mission Statement */}
        <div className="mb-16 text-center">
          <p className="text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
            At <span className="font-semibold text-blue-600">RentMate</span>, we believe finding the perfect space
            and the right roommate should be simple, secure, and seamless.
            Our mission is to connect people and places effortlessly, giving you the power to live better, together.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaHome className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Listings</h3>
            <p className="text-sm text-gray-600">
              Discover curated rental options based on preferences and verified data.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Right Connections</h3>
            <p className="text-sm text-gray-600">
              Get matched with compatible roommates based on lifestyle and location.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verified & Secure</h3>
            <p className="text-sm text-gray-600">
              All listings and users are verified for a safer rental experience.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaBolt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast & Simple</h3>
            <p className="text-sm text-gray-600">
              Easy-to-use platform that saves time and speeds up your rental journey.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Ready to find your next home?</h2>
          <p className="text-gray-700 mb-6">Join RentMate and experience smarter renting today.</p>
          <a
            href="/register"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
