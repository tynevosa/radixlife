import React, { PropsWithChildren } from "react";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
}

const Label: React.FC<PropsWithChildren<LabelProps>> = ({
  image,
  className = "",
  ...props
}) => {
  return (
    <div className={`relative flex text-[#720E20] ${className}`} {...props}>
      <img
        src={image}
        alt={"label"}
        className={`${className}`}
      />
      <div className="absolute inset-0 flex items-center justify-center select-none">
        {props.children}
      </div>
    </div>
  );
};

export default Label;
