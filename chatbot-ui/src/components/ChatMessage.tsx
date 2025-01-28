import { cn } from "@/lib/utils";
import { UserRound, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Theme } from "@/config/themes";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  theme: Theme;
}

export const ChatMessage = ({ message, isAi, theme }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 animate-message-fade-in py-2",
        isAi ? "justify-start" : "justify-end flex-row-reverse"
      )}
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback className={cn(
          "text-white",
          isAi ? theme.aiAvatar : theme.userAvatar
        )}>
          {isAi ? <MessageCircle className="w-4 h-4" /> : <UserRound className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2.5 text-sm shadow-sm",
          isAi 
            ? `${theme.aiBubble} rounded-tl-none` 
            : `${theme.userBubble} rounded-tr-none`
        )}
      >
        {message}
      </div>
    </div>
  );
};