import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LoadingDots } from "@/components/LoadingDots";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Palette, Sun, Moon } from "lucide-react";
import { themes, type Theme } from "@/config/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: number;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      id: crypto.randomUUID(),
      text: message,
      isAi: false,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const apiUrl = 'https://ai-chatbot-29lu.onrender.com/ai/chat';

      console.log("Sending request to AI endpoint:", apiUrl);
      console.log("Request payload:", { message });
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ message }), 
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full AI Response received:", data);
      
      const aiText = data.candidates[0].content.parts[0].text;
      console.log("Extracted AI text:", aiText);
      
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        text: aiText,
        isAi: true,
        timestamp: Date.now(),
      }]);
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
    setMessages((prev) => {
      // Remove the previous bot response related to the message
      return prev.filter((msg) => msg.id !== `bot_${messageId}`).map((msg) =>
        msg.id === messageId ? { ...msg, text: newText, timestamp: Date.now() } : msg
      );
    });
  
    setIsLoading(true);
  
    try {
      const apiUrl = 'https://ai-chatbot-29lu.onrender.com/ai/chat';
  
      console.log("Sending edited message to AI:", newText);
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ message: newText }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("AI Response received:", data);
  
      const aiText = data.candidates[0].content.parts[0].text;
  
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${messageId}`, // New bot response linked to the edited message
          text: aiText,
          isAi: true,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error("Error sending edited message:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Message copied to clipboard!",
    });
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">AI Chat Assistant</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Select
              value={currentTheme.name}
              onValueChange={(value) => {
                const theme = themes.find((t) => t.name === value);
                if (theme) setCurrentTheme(theme);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.name} value={theme.name}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-3xl mx-auto p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-2">
              <MessageCircle className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              <p className="text-center">Start a conversation with the AI assistant!</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAi={message.isAi}
              theme={currentTheme}
              timestamp={message.timestamp}
              onCopy={() => handleCopyMessage(message.text)}
              onEdit={!message.isAi ? (newText) => handleEditMessage(message.id, newText) : undefined}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>

      <footer className="py-4 px-6 bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="container max-w-3xl mx-auto text-center">
          <Separator className="mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Chat Assistant. Created by <a 
              href="https://github.com/neeraj3071" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              neeraj3071
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;