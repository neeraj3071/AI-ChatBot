import { cn } from "@/lib/utils";
import { UserRound, MessageCircle, Copy, Pencil, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Theme } from "@/config/themes";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  theme: Theme;
  timestamp: number;
  onCopy: () => void;
  onEdit?: (newMessage: string) => void;
}

export const ChatMessage = ({ message, isAi, theme, timestamp, onCopy, onEdit }: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleSaveEdit = () => {
    if (editedMessage.trim() && onEdit) {
      onEdit(editedMessage);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedMessage(message);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 animate-message-fade-in py-2 group",
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

      <div className="relative max-w-[80%]">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <Input
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="min-w-[300px]"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSaveEdit}
                disabled={!editedMessage.trim()}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm shadow-sm",
              isAi 
                ? `${theme.aiBubble} rounded-tl-none dark:bg-gray-800 dark:border-gray-700` 
                : `${theme.userBubble} rounded-tr-none dark:bg-blue-600`
            )}
          >
            {message}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formattedTime}
            </div>
          </div>
        )}
        
        {!isEditing && (
          <div className="absolute top-0 right-0 -mr-8 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            {!isAi && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};