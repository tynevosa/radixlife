import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import MenuBar from "../../components/menu";
import { formatTime, sleep } from "../../utils/time";

type DebitModalProps = {
  time: number;
}

const DebitModal: React.FC<DebitModalProps> = (props) => {
  return (
    <div className="relative"
      style={{
        width: props.time ? 497 : 800,
        height: props.time ? 389 : 637,
      }}
    >
      <img
        src={"/assets/frame_info.png"}
        alt={"frame_info"}
        className="absolute object-fill"
        style={{
          width: props.time ? 497 : 800,
          height: props.time ? 389 : 637,
        }}
      />
      {props.time ?
        <div
          className="absolute w-full h-full bg-black flex flex-col items-center -z-10"
          style={{
            clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
          }}
        />
        :
        <div
          className="absolute w-full h-full bg-[#FBE3DF] flex flex-col items-center -z-10"
          style={{
            clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
          }}
        />
      }
      <div
        className="absolute w-full h-full flex flex-col items-center overflow-hidden"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      >
        {props.time ?
          <>
            <p className="text-center p-4 text-[20px] mt-[16px]">HOME DEBIT TO PAY</p>
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
              {formatTime(props.time)}
            </div>
            <Button
              image={"/assets/button_primary.png"}
              className={"w-[138px] h-[46px]"}
              text={"PAY DEBIT"}
            />
          </>
          :
          <>
            <img
              src={"/assets/bankruptcy.png"}
              alt={"bankruptcy"}
              className="object-fill pt-10"
            />
            <div className="relative flex mt-2">
              <img
                src={"/assets/frame_other_long.png"}
                alt={"frame_other_long"}
                width={186}
                height={51}
                className="w-[211px] h-[44.3px]"
              />
              <div className="absolute inset-0 flex items-center justify-center font-[16px] text-[#FF1D1D]">
                -$35,555.56
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}


export default function Debit() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(30); // temperally set 30 seconds
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
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    updateScale();
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    if (!timeLeft) {
      sleep(5000).then(() => navigate('/jail'))
    }
  }, [timeLeft])

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <div
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          width: `${isMobile ? isPortrait ? 700 : 1440 : 1440}px`,
          height: `${isMobile ? isPortrait ? 1150 : 565 : 1024}px`,
        }}
        className="w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/debit_bg.png)] bg-cover bg-fixed bg-center py-[47px]"
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
              <DebitModal time={timeLeft} />
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
              <DebitModal time={timeLeft} />
            </div>
          </>}
      </div >
    </div >
  );
}
