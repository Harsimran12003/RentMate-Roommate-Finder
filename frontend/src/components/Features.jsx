import { motion } from "framer-motion";
import { Home, Users, MessageCircle, Wallet } from "lucide-react";

const features = [
  {
    icon: <Home className="w-10 h-10 text-[#4e54c8]" />,
    title: "Smart Property Matching",
    desc: "Find properties that suit your lifestyle and preferences effortlessly.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#4e54c8]" />,
    title: "Roommate Compatibility",
    desc: "Connect with like-minded roommates for a comfortable living experience.",
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-[#4e54c8]" />,
    title: "Built-in Chat",
    desc: "Chat with potential roommates or landlords directly within the platform.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-[#4e54c8]" />,
    title: "Expense Tracking",
    desc: "Manage and split expenses with roommates transparently and easily.",
  },
];

const Features = () => {
  return (
    <section className="px-6 sm:px-10 md:px-20 py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#4e54c8]">
        Key Features
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
