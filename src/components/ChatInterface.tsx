
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, User, Bot, Info, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "Welcome to EyeVision AI Assistant! Ask me anything about eye health, diseases, or treatments.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Sample responses for demo purposes
  const sampleResponses = {
    "what is glaucoma": "Glaucoma is a group of eye conditions that damage the optic nerve, which is vital for good vision. This damage is often caused by abnormally high pressure in your eye. Glaucoma is one of the leading causes of blindness for people over the age of 60. It can occur at any age but is more common in older adults.",
    "symptoms of diabetic retinopathy": "Early diabetic retinopathy often has no symptoms. As it progresses, symptoms may include: spots or dark strings floating in your vision (floaters), blurred vision, fluctuating vision, impaired color vision, dark or empty areas in your vision, and vision loss. Diabetic retinopathy usually affects both eyes.",
    "how to prevent macular degeneration": "To help prevent age-related macular degeneration (AMD): maintain a healthy diet rich in fruits and vegetables, particularly dark, leafy greens like spinach and kale; exercise regularly; maintain normal blood pressure and cholesterol levels; don't smoke; protect your eyes from UV light with sunglasses; and get regular eye exams, especially if you have a family history of AMD.",
    "what causes dry eyes": "Dry eyes can be caused by decreased tear production or increased tear evaporation. Factors include aging, certain medical conditions (diabetes, rheumatoid arthritis), medications (antihistamines, decongestants), wind, smoke, or dry climate, prolonged screen time, and vitamin A deficiency.",
    "how often should I get an eye exam": "Adults should get a comprehensive eye exam every 1-2 years, depending on age, risk factors and whether they currently wear glasses or contacts. People with diabetes should get an eye exam every year. Children should have their first eye exam at 6 months, another at age 3, and again before starting school.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      // Check if we have a prepared response for this query
      const normalizedQuery = query.toLowerCase().trim();
      let response = "I don't have specific information about that. Please consult with an eye care professional for personalized advice.";
      
      // Search for partial matches in our sample responses
      for (const [key, value] of Object.entries(sampleResponses)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
          response = value;
          break;
        }
      }
      
      // Simulate network delay
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      const response = await generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: "Sorry, I'm having trouble processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "system",
        content: "Chat cleared. How can I help you with eye health today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className={cn("flex flex-col border rounded-lg bg-card h-[600px]", className)}>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Bot size={18} className="text-primary" />
          </div>
          <h3 className="font-medium">EyeVision AI Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={clearChat}>
          <Trash size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-max max-w-[80%] rounded-lg px-4 py-2",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : message.role === "assistant"
                ? "bg-muted"
                : "bg-accent/20 w-full max-w-full text-center text-sm"
            )}
          >
            {message.role !== "system" && (
              <div className="mr-2 mt-0.5">
                {message.role === "user" ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
              </div>
            )}
            
            <div>{message.content}</div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-max max-w-[80%] rounded-lg px-4 py-2 bg-muted">
            <div className="mr-2 mt-0.5">
              <Bot size={16} />
            </div>
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-150"></div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about eye health..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isTyping || !input.trim()}>
            <SendHorizontal size={18} />
          </Button>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Info size={12} />
          <span>AI responses are simulated and for educational purposes only.</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
