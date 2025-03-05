import React from "react";

interface NineSliceProps {
  image: string;
  width: number;
  height: number;
  leftTop?: number;
  leftBottom?: number;
  rightTop?: number;
  rightBottom?: number;
  edgeSize?: number;
  children?: React.ReactNode; // Allows content inside
}

const NineSlice: React.FC<NineSliceProps> = ({
  image,
  width,
  height,
  leftTop = 5,
  leftBottom = 5,
  rightTop = 5,
  rightBottom = 5,
  edgeSize = 5,
  children,
}) => {
  if (!image || !width || !height) {
    console.error("NineSlice component requires valid image, width, and height");
    return null;
  }

  return (
    <div className="relative" style={{ width, height }}>
      {/* Top Left */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: leftTop,
          height: leftTop,
          backgroundImage: `url(${image})`,
          backgroundPosition: "top left",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Top Edge */}
      <div
        className="absolute top-0"
        style={{
          left: leftTop,
          right: rightTop,
          height: edgeSize,
          backgroundImage: `url(${image})`,
          backgroundPosition: "top center",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Top Right */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: rightTop,
          height: rightTop,
          backgroundImage: `url(${image})`,
          backgroundPosition: "top right",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Left Edge */}
      <div
        className="absolute left-0"
        style={{
          top: leftTop,
          bottom: leftBottom,
          width: edgeSize,
          backgroundImage: `url(${image})`,
          backgroundPosition: "center left",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Center Content (inside the frame) */}
      <div
        className="absolute bg-black"
        style={{
          top: leftTop,
          bottom: leftBottom,
          left: leftTop,
          right: rightTop,
        }}
      >
        {children}
      </div>

      {/* Right Edge */}
      <div
        className="absolute right-0"
        style={{
          top: rightTop,
          bottom: rightBottom,
          width: edgeSize,
          backgroundImage: `url(${image})`,
          backgroundPosition: "center right",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Bottom Left */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: leftBottom,
          height: leftBottom,
          backgroundImage: `url(${image})`,
          backgroundPosition: "bottom left",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Bottom Edge */}
      <div
        className="absolute bottom-0"
        style={{
          left: leftBottom,
          right: rightBottom,
          height: edgeSize,
          backgroundImage: `url(${image})`,
          backgroundPosition: "bottom center",
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      {/* Bottom Right */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: rightBottom,
          height: rightBottom,
          backgroundImage: `url(${image})`,
          backgroundPosition: "bottom right",
          backgroundSize: `${width}px ${height}px`,
        }}
      />
    </div>
  );
};

export default NineSlice;
