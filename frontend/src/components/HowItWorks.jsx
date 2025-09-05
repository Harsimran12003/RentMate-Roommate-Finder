import { motion } from "framer-motion";

const steps = [
  { icon: "🔍", title: "Browse Homes", desc: "Explore listings tailored to your needs." },
  { icon: "🤝", title: "Connect", desc: "Match with like-minded roommates effortlessly." },
  { icon: "💬", title: "Chat & Share", desc: "Get to know each other before moving in." },
  { icon: "🏠", title: "Move In", desc: "Enjoy a stress-free rental experience." },
];

const HowItWorks = () => {
  return (
    <section className="px-8 md:px-20 py-20 bg-white">
      <h3 className="text-4xl font-extrabold text-center mb-16 text-[#4e54c8]">
        How It Works
      </h3>

      <div className="grid gap-12 md:grid-cols-4 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative group bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-[#4e54c8] to-[#5c6ac4] text-white text-3xl shadow-lg">
              {step.icon}
            </div>
            <h4 className="font-bold text-xl mt-6 group-hover:text-[#4e54c8] transition">
              {step.title}
            </h4>
            <p className="text-gray-600 mt-3">{step.desc}</p>
            <span className="absolute top-4 right-4 text-gray-300 text-5xl font-extrabold opacity-20">
              {`0${index + 1}`}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
