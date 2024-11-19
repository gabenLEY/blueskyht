import React, { useState } from 'react';

// Define the type for the onClickBtn function
interface FeedsProps {
  onClickBtn: (message: string) => void; // Accepts a string and returns void
}

const Feeds: React.FC<FeedsProps> = ({ onClickBtn }) => {
  const [btnPopular, setBtnPopular] = useState<boolean>(false);
  const [btnFollowing, setBtnFollowing] = useState<boolean>(false);

  return (
    <div className="flex justify-around py-4 border-b px-3">
      <div>
        <button 
          onClick={() => {
            setBtnPopular(!btnPopular)
            setBtnFollowing(false)
            onClickBtn("Hello haiti");
          }}
        >
          <p
            className={`text-xl ${
              btnPopular
                ? "text-blue-500 font-semibold"
                : "text-gray-600 font-light"
            }`}
          >
            Popular
          </p>
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            //alert("hello")
            setBtnPopular(false)
            setBtnFollowing(!btnFollowing); // Example of toggling state
          }}
        >
          <p
            className={`text-xl ${
              btnFollowing
                ? "text-blue-500 font-semibold"
                : "text-gray-600 font-light"
            }`}
          >
            Following
          </p>
        </button>
      </div>
    </div>
  );
};

export default Feeds;