
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // This is a mock authentication - in a real app, this would connect to a backend
    if (email && password && (!isLogin ? username : true)) {
      // Mock successful authentication
      localStorage.setItem("user", JSON.stringify({ email, username: isLogin ? email.split("@")[0] : username }));
      toast({
        title: isLogin ? "Logged in successfully" : "Account created successfully",
        description: "Welcome to Kanha GPT!",
      });
      navigate("/chat");
    } else {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="relative bg-krishna-blue min-h-screen overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-16">
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <motion.h2
                className="text-2xl sm:text-3xl font-semibold text-krishna-darkBlue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </motion.h2>
              <motion.p
                className="text-krishna-darkBlue/70 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {isLogin
                  ? "Sign in to continue your conversation with Krishna"
                  : "Join us to start your spiritual journey with Krishna"}
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-krishna-darkBlue/50" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                  <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-krishna-darkBlue/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-krishna-gold hover:bg-amber-500 text-krishna-darkBlue"
                type="submit"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                className="text-krishna-darkBlue/70 hover:text-krishna-darkBlue"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
