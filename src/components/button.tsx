import React from "react";

interface ButtonProps {
  image: string;
  className: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  image,
  className = "",
  text = "BUTTON"
}) => {
  return (
    <div className={`relative flex text-[#720E20] ${className} cursor-pointer hover:opacity-80 transition-transform duration-200 active:scale-80`}>
      <img
        src={image}
        alt={"button"}
        className={`${className}`}
      />
      <div className="absolute inset-0 flex items-center justify-center select-none">
        {text}
      </div>
    </div>
  );
};

export default Button;
