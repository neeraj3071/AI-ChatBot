import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LoadingDots } from "@/components/LoadingDots";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Palette } from "lucide-react";
import { themes, type Theme } from "@/config/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  text: string;
  isAi: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, isAi: false }]);
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
      
      setMessages((prev) => [...prev, { text: aiText, isAi: true }]);
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-500" />
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
      </header>
      
      <main className="flex-1 container max-w-3xl mx-auto p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
              <MessageCircle className="w-12 h-12 text-gray-400" />
              <p className="text-center">Start a conversation with the AI assistant!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isAi={message.isAi}
              theme={currentTheme}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t bg-white rounded-lg p-4 shadow-sm">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;