import React from "react";

export default function FloatingButton() {
  const handleClick = () => {
    // Add your create post logic here
    console.log("Open create post modal!");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
}