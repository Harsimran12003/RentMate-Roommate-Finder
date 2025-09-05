import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] text-gray-800">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
