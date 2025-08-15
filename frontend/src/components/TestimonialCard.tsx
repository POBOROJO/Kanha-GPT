
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ quote, name, title }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-white/80 p-8 rounded-lg shadow-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-krishna-darkBlue/80 italic mb-6">"{quote}"</p>
      <div>
        <p className="font-medium text-krishna-darkBlue">{name}</p>
        <p className="text-sm text-krishna-darkBlue/70">{title}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
