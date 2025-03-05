import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import Menu from "../home/Menu";
import Character from "../home/Character";

const LogModal = () => {
  return (
    <div className="w-[939px] h-[621px] relative">
      <img
        src={"/assets/frame_info.png"}
        alt={"frame_info"}
        width={'939'}
        height={'621'}
        className="absolute w-[939px] h-[621px] object-fill"
      />
      <div
        className="absolute w-full h-full bg-black flex flex-col items-center -z-10"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      />
      <div
        className="absolute w-full h-full flex flex-col overflow-hidden p-20"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      >
        <p className="p-4 text-[20px]">
          ACTIVITY: JAILED AT 2PM SUNDAY.<br />
          REASON: RENT NOT PAID
        </p>
        <p className="p-4 text-[20px]">
          TIME:<br />
          09:25:35AM
        </p>
      </div>
    </div>
  )
}

export default function Log() {
  const navigate = useNavigate();

  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const updateScale = () => {
    // Set the div's original width and height (example: 500px by 300px)
    const originalWidth = isMobile ? isPortrait ? 700 : 1440 : 1440;
    const originalHeight = isMobile ? isPortrait ? 1150 : 665 : 1024;

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
          height: `${isMobile ? isPortrait ? 1150 : 665 : 1024}px`,
        }}
        className="w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/log_bg.png)] bg-cover bg-fixed bg-center py-[47px]"
      >
        {isMobile ?
          isPortrait ?
            <div className="flex flex-col gap-6">
              <div className="w-full flex justify-between items-center px-[30px]">
                <div className="flex items-center gap-[23px]">
                  <img
                    src={"/assets/menu_hamburger.png"}
                    alt={"menu_hamburger"}
                    width={91}
                    height={90}
                    className="cursor-pointer"
                  />
                  <div className={`relative flex justify-center items-center`}>
                    <img
                      src={"/assets/frame_avatar.png"}
                      alt={"frame_avatar"}
                      width={138}
                      height={138}
                    />
                    <img
                      src={"/assets/user_avatar.png"}
                      alt={"user_avatar"}
                      width={138}
                      height={138}
                      className="absolute scale-70"
                    />
                  </div>
                </div>
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px]"}
                  text={"CONNECT"}
                />
              </div>
              <div className="w-full flex justify-between items-center px-[30px]">
                <div className="flex gap-4">
                  <Menu />
                  <Character />
                </div>
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="w-full flex justify-center mt-16">
                <LogModal />
              </div>
            </div>
            :
            <>
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                <LogModal />
              </div>
              <div className="absolute flex flex-col left-12 gap-8">
                <img
                  src={"/assets/menu_hamburger.png"}
                  alt={"menu_hamburger"}
                  width={91}
                  height={90}
                  className="cursor-pointer"
                />
                <Menu className="flex-col" />
              </div>
              <div className="absolute flex flex-col justify-between right-12 gap-8 items-end">
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px]"}
                  text={"CONNECT"}
                />
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <div className="flex flex-col items-center gap-4 mt-8">
                  <div className={`relative flex justify-center items-center`}>
                    <img
                      src={"/assets/frame_avatar.png"}
                      alt={"frame_avatar"}
                      width={138}
                      height={138}
                    />
                    <img
                      src={"/assets/user_avatar.png"}
                      alt={"user_avatar"}
                      width={138}
                      height={138}
                      className="absolute scale-70"
                    />
                  </div>
                  <Character />
                </div>
              </div>
            </>
          :
          <>
            <div className="w-full flex justify-between items-center px-[67px]">
              <div className="flex items-center gap-[23px]">
                <img
                  src={"/assets/menu_hamburger.png"}
                  alt={"menu_hamburger"}
                  width={91}
                  height={90}
                  className="cursor-pointer"
                />
                <div className={`relative flex justify-center items-center`}>
                  <img
                    src={"/assets/frame_avatar.png"}
                    alt={"frame_avatar"}
                    width={138}
                    height={138}
                  />
                  <img
                    src={"/assets/user_avatar.png"}
                    alt={"user_avatar"}
                    width={138}
                    height={138}
                    className="absolute scale-70"
                  />
                </div>
              </div>
              <div className="flex gap-[18px]">
                <Menu />
                <Character />
                <div className="ml-12">
                  <Button
                    image={"/assets/button_primary.png"}
                    className={"w-[206px] h-[55px]"}
                    text={"CONNECT"}
                  />
                </div>
              </div>
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
              <LogModal />
            </div>
          </>
        }
      </div>
    </div>
  );
}
