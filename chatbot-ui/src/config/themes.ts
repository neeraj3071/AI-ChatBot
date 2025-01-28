export interface Theme {
  name: string;
  userBubble: string;
  aiBubble: string;
  userAvatar: string;
  aiAvatar: string;
}

export const themes: Theme[] = [
  {
    name: "Default Blue",
    userBubble: "bg-blue-500 text-white",
    aiBubble: "bg-white border border-gray-200",
    userAvatar: "bg-green-500",
    aiAvatar: "bg-blue-500",
  },
  {
    name: "Purple Dream",
    userBubble: "bg-purple-500 text-white",
    aiBubble: "bg-purple-50 border border-purple-200",
    userAvatar: "bg-purple-600",
    aiAvatar: "bg-purple-400",
  },
  {
    name: "Forest",
    userBubble: "bg-emerald-600 text-white",
    aiBubble: "bg-emerald-50 border border-emerald-200",
    userAvatar: "bg-emerald-700",
    aiAvatar: "bg-emerald-500",
  },
  {
    name: "Sunset",
    userBubble: "bg-orange-500 text-white",
    aiBubble: "bg-orange-50 border border-orange-200",
    userAvatar: "bg-orange-600",
    aiAvatar: "bg-orange-400",
  },
];