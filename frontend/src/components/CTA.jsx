import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-[#4e54c8] to-[#5c6ac4] text-white py-16 px-8 md:px-20 text-center">
      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to find your perfect roommate?
      </h3>
      <p className="mb-8 text-lg">
        Sign up today and get started for free with RentMate!
      </p>
      <Link
        to="/register"
        className="bg-white text-[#4e54c8] px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        Join Now
      </Link>
    </section>
  );
};

export default CTA;
