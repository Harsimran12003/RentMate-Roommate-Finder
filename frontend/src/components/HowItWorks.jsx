import { motion } from "framer-motion";

const steps = [
  { icon: "🔍", title: "Browse Homes", desc: "Explore listings tailored to your needs." },
  { icon: "🤝", title: "Connect", desc: "Match with like-minded roommates effortlessly." },
  { icon: "💬", title: "Chat & Share", desc: "Get to know each other before moving in." },
  { icon: "🏠", title: "Move In", desc: "Enjoy a stress-free rental experience." },
];

const HowItWorks = () => {
  return (
    <section className="px-6 sm:px-10 md:px-20 py-16 md:py-20 bg-white">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#4e54c8]">
        How It Works
      </h3>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-[#4e54c8] to-[#5c6ac4] text-white text-3xl mb-4">
              {step.icon}
            </div>
            <h4 className="font-semibold text-lg text-gray-800 mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
