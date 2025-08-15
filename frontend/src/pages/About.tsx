
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-krishna-blue">
      <Navbar />
      
      <main className="flex-grow px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Kanha GPT
          </motion.h1>
          
          <motion.div 
            className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-krishna-darkBlue/80 mb-6">
              Kanha GPT was born from a deep admiration for the Bhagavad Gita's timeless wisdom and a desire to make these profound teachings accessible in today's digital world. By combining cutting-edge AI technology with the ancient wisdom of the Gita, we've created a platform where anyone can engage in meaningful conversations with Lord Krishna.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Why We Built This Project</h2>
            <p className="text-krishna-darkBlue/80 mb-6">
              The inspiration for Kanha GPT came from recognizing the continued relevance of the Bhagavad Gita's teachings in addressing modern challenges. In our fast-paced world, many people seek guidance but may find traditional texts difficult to approach. Our platform bridges this gap by offering personalized, conversational access to these profound philosophical insights.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="text-krishna-darkBlue/80">
              Through advanced natural language processing and a deep understanding of the Bhagavad Gita, Kanha GPT responds to your questions in the voice of Lord Krishna. Whether you're seeking guidance on personal dilemmas, philosophical inquiries, or spiritual growth, the conversation adapts to your unique needs, making ancient wisdom relevant to your contemporary life.
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              className="bg-krishna-gold hover:bg-amber-500 text-krishna-darkBlue px-8 py-6 rounded-full text-lg transition-all duration-300"
            >
              Start a Conversation
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
