import React from "react";

interface ThreeSliceImageProps {
  imageUrl: string; // URL of the image
  sideWidth: number; // Fixed width for both left and right parts
  className?: string; // Additional Tailwind CSS classes for the container
}

const ThreeSliceImage: React.FC<ThreeSliceImageProps> = ({
  imageUrl,
  sideWidth,
  className,
}) => {
  return (
    <div className={`flex ${className}`}>
      {/* Left Part (Fixed Width) */}
      <div
        className="h-full bg-cover bg-no-repeat"
        style={{
          width: `${sideWidth}px`,
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "left",
        }}
      ></div>

      {/* Middle Part (Scalable) */}
      <div
        className="flex-grow h-full bg-cover bg-repeat-x"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right Part (Fixed Width) */}
      <div
        className="h-full bg-cover bg-no-repeat"
        style={{
          width: `${sideWidth}px`,
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "right",
        }}
      ></div>
    </div>
  );
};

export default ThreeSliceImage;