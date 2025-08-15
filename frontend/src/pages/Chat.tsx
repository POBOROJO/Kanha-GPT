
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, LogOut, Menu, PanelLeftClose, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatMessage from "@/components/ChatMessage";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "krishna";
  timestamp: Date;
};

type ConversationType = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

const mockConversations: ConversationType[] = [
  {
    id: "1",
    title: "Dharma and Duty",
    lastMessage: "What is my dharma in this life?",
    timestamp: new Date(2025, 3, 3),
  },
  {
    id: "2",
    title: "Inner Peace",
    lastMessage: "How can I find inner peace?",
    timestamp: new Date(2025, 3, 2),
  },
  {
    id: "3",
    title: "Karma Yoga",
    lastMessage: "Tell me about karma yoga.",
    timestamp: new Date(2025, 3, 1),
  },
];

const krishnaResponses = [
  "As I told Arjuna, fulfill your duty without attachment to the fruits of your actions. This is the essence of karma yoga.",
  "Remember, wherever there is Krishna and wherever there is Arjuna, there will be wealth, victory, prosperity, and morality.",
  "The mind is restless and difficult to restrain, but it can be controlled by practice and detachment.",
  "Those who eat too much or eat too little, who sleep too much or sleep too little, cannot succeed in meditation.",
  "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
  "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.",
  "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
];

const suggestedQuestions = [
  "What does the Bhagavad Gita teach about duty?",
  "How can I find my purpose in life?",
  "Tell me about the concept of dharma.",
  "What is the meaning of karma?",
  "How can I achieve inner peace?",
];

const SidebarToggle = () => {
  const { toggleSidebar, open } = useSidebar();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="text-krishna-darkBlue hover:bg-krishna-blue/20"
      title={open ? "Close Sidebar" : "Open Sidebar"}
    >
      {open ? 
        <PanelLeftClose className="h-5 w-5" /> : 
        <Menu className="h-5 w-5" />
      }
    </Button>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: "Namaste! I am Krishna, how may I guide you today?",
      sender: "krishna",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentConversation, setCurrentConversation] = useState<ConversationType | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>(mockConversations);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Speech recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
    }
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Voice Input Error",
          description: `Could not recognize speech: ${event.error}`,
          variant: "destructive",
        });
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [navigate, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    setTimeout(() => {
      const randomResponse = krishnaResponses[Math.floor(Math.random() * krishnaResponses.length)];
      const krishnaMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "krishna",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, krishnaMessage]);
      
      if (!currentConversation) {
        const newConversation: ConversationType = {
          id: Date.now().toString(),
          title: input.substring(0, 20) + (input.length > 20 ? "..." : ""),
          lastMessage: input,
          timestamp: new Date(),
        };
        
        setCurrentConversation(newConversation);
        setConversations((prev) => [newConversation, ...prev]);
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "We hope to see you again soon!",
    });
    navigate("/");
  };

  const selectConversation = (conversation: ConversationType) => {
    setCurrentConversation(conversation);
    setMessages([
      {
        id: "sample",
        content: "This is where the selected conversation would load.",
        sender: "krishna",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen bg-krishna-blue/20">
        <Sidebar className="border-r border-krishna-blue/20">
          <SidebarHeader className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-serif text-krishna-darkBlue">Kanha GPT</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-krishna-darkBlue hover:text-red-500"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Your Conversations</SidebarGroupLabel>
              <SidebarMenu>
                {conversations.map((conversation) => (
                  <SidebarMenuItem key={conversation.id}>
                    <SidebarMenuButton 
                      onClick={() => selectConversation(conversation)}
                      isActive={currentConversation?.id === conversation.id}
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{conversation.title}</span>
                        <span className="text-xs text-muted-foreground truncate w-full">
                          {conversation.lastMessage.substring(0, 25)}
                          {conversation.lastMessage.length > 25 ? "..." : ""}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <div className="p-2 border-b border-krishna-blue/20">
            <SidebarToggle />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <div className="p-4 border-t border-krishna-blue/20 bg-white/50 backdrop-blur-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-krishna-blue/30 border-krishna-blue/40 text-krishna-darkBlue text-xs hover:bg-krishna-blue/50"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Krishna anything..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button
                onClick={toggleListening}
                className={`${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-krishna-blue/50 hover:bg-krishna-blue/70"
                } text-krishna-darkBlue`}
                size="icon"
                title={isListening ? "Stop Listening" : "Start Voice Input"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button 
                onClick={handleSend} 
                className="bg-krishna-gold hover:bg-amber-500 text-krishna-darkBlue"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;
