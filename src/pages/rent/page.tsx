import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import MenuBar from "../../components/menu";

const RentModal = () => {
  return (
    <div className="w-[497px] h-[389px] relative">
      <img
        src={"/assets/frame_info.png"}
        alt={"frame_info"}
        className="absolute"
      />
      <div
        className="absolute w-full h-full bg-black flex flex-col items-center -z-10"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      />
      <div
        className="absolute w-full h-full flex flex-col items-center overflow-hidden"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      >
        <p className="text-center p-4 text-[20px] mt-[16px]">HOME RENT TO PAY</p>
        <div className="flex justify-center space-x-[-20px] mt-4">
          <img
            src={"/assets/dollar_bunch.png"}
            alt={"dollar_bunch.png"}
            width={32}
            height={32}
          />
          <img
            src={"/assets/dollar_bunch.png"}
            alt={"dollar_bunch.png"}
            width={32}
            height={32}
            className="-translate-y-[5px]"
          />
          <img
            src={"/assets/dollar_bunch.png"}
            alt={"dollar_bunch.png"}
            width={32}
            height={32}
            className="translate-y-[5px]"
          />
        </div>
        <div className="relative flex mt-2">
          <img
            src={"/assets/frame_other_long.png"}
            alt={"frame_other_long"}
            width={186}
            height={51}
            className="w-[211px] h-[44.3px]"
          />
          <div className="absolute inset-0 flex items-center justify-center font-[16px]">
            $3005
          </div>
        </div>
        <span className="text-[20px] mt-2">DUE DATE</span>
        <div className="bg-[#313131]/65 border-y border-white/32 rounded-[8.6px] px-[10px] py-2 mt-4 mb-2">
          24:56:45
        </div>
        <Button
          image={"/assets/button_primary.png"}
          className={"w-[138px] h-[46px]"}
          text={"PAY RENT"}
        />
      </div>
    </div>
  )
}

export default function Rent() {
  const navigate = useNavigate();

  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const updateScale = () => {
    // Set the div's original width and height (example: 500px by 300px)
    const originalWidth = isMobile ? isPortrait ? 700 : 1440 : 1440;
    const originalHeight = isMobile ? isPortrait ? 1150 : 565 : 1024;

    // Calculate scale factors for both axes
    const scaleX = windowSize.width / originalWidth;
    const scaleY = windowSize.height / originalHeight;

    // Update state with the new scale factors
    setScaleX(scaleX);
    setScaleY(scaleY);
  }

  useEffect(() => {
    updateScale();
  }, [windowSize, isMobile, isPortrait]);

  useEffect(() => {
    updateScale();
  }, [])

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <div
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          width: `${isMobile ? isPortrait ? 700 : 1440 : 1440}px`,
          height: `${isMobile ? isPortrait ? 1150 : 565 : 1024}px`,
        }}
        className="w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/rent_bg.png)] bg-cover bg-fixed bg-center py-[47px]"
      >
        {isMobile && !isPortrait ?
          <>
            <div className="w-full flex justify-between items-center px-[67px]">
              <MenuBar />
              <Button
                image={"/assets/button_primary.png"}
                className={"w-[206px] h-[55px]"}
                text={"CONNECT"}
              />
            </div>
            <div className="w-full flex justify-end px-[67px]">
              <img
                src={"/assets/back.png"}
                alt={"back"}
                width={79}
                height={79}
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="absolute inset-0 w-full h-full flex justify-center items-center -z-10">
              <RentModal />
            </div>
          </>
          :
          <>
            <div className="w-full flex justify-between items-start px-[67px]">
              <MenuBar />
              <Button
                image={"/assets/button_primary.png"}
                className={"w-[206px] h-[55px]"}
                text={"CONNECT"}
              />
            </div>
            <div className="w-full flex justify-end px-[67px]">
              <img
                src={"/assets/back.png"}
                alt={"back"}
                width={79}
                height={79}
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="w-full flex justify-center mt-24">
              <RentModal />
            </div>
          </>}
      </div >
    </div >
  );
}
