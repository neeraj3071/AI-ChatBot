export const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      <div className="animate-bounce h-2 w-2 bg-gray-400 rounded-full delay-0"></div>
      <div className="animate-bounce h-2 w-2 bg-gray-400 rounded-full delay-150"></div>
      <div className="animate-bounce h-2 w-2 bg-gray-400 rounded-full delay-300"></div>
    </div>
  );
};