
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/50 p-5 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-semibold mb-3">{title}</h3>
      <p className="text-krishna-darkBlue/80 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
