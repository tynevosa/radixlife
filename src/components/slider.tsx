import { useState, useRef } from "react";

const Slider = () => {
  const [value, setValue] = useState(50); // Initial slider value
  const sliderRef = useRef<HTMLInputElement>(null); // Ref for the slider input

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleThumbDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left; // Mouse position relative to the slider
    const newValue = (offsetX / rect.width) * 100; // Calculate new value
    const clampedValue = Math.min(100, Math.max(0, newValue)); // Clamp value between 0 and 100

    setValue(clampedValue);
    slider.value = String(clampedValue); // Update the slider input value
  };

  return (
    <div className="w-64 h-[14.36px] outline-2 outline-white/32 rounded-lg shadow-md">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {/* Track */}
        <div className="absolute inset-0 h-full bg-[#202020] rounded-full"></div>

        {/* Fill Path */}
        <div
          className="absolute inset-y-0 left-0 h-full bg-[#2875B2] rounded-full"
          style={{ width: `${value}%` }}
        ></div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          ref={sliderRef}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer focus:outline-none z-10 opacity-0" // Hide the input visually
          style={{
            WebkitAppearance: "none", // Hide default thumb in WebKit browsers
            MozAppearance: "none", // Hide default thumb in Firefox
          }}
        />

        {/* Custom Slider Thumb (Image) */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 size-[26.32px] rounded-full overflow-hidden shadow-md cursor-pointer" // Make the thumb draggable
          style={{ left: `calc(${value}% - 13.16px)` }} // Adjust left position for centering
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent default behavior
            const handleMouseMove = (e: MouseEvent) => handleThumbDrag(e as unknown as React.MouseEvent<HTMLDivElement>);
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        >
          <img
            src={`/assets/slider_indicator.png`} // Replace with your image URL
            alt="Slider Thumb"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;