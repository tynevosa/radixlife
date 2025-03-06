import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import MenuBar from "../../components/menu";
import Modal from "../../components/modal";

export default function Jail() {
  const navigate = useNavigate();

  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const updateScale = () => {
    // Set the div's original width and height (example: 500px by 300px)
    const originalWidth = isMobile ? isPortrait ? 720 : 1440 : 1440;
    const originalHeight = isMobile ? isPortrait ? 1024 : 785 : 1024;

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
          width: `${isMobile ? isPortrait ? 720 : 1440 : 1440}px`,
          height: `${isMobile ? isPortrait ? 1024 : 785 : 1024}px`,
        }}
        className={`w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/jail_bg.png)] bg-cover bg-fixed py-[47px] ${isMobile && isPortrait ? 'bg-left' : 'bg-bottom'}`}
      >
        {isMobile && isPortrait ?
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
            <img
              src={"/assets/jail_door1.png"}
              alt={"jail_door1"}
              className={`absolute left-[91.92px] z-10 top-[282px]`}
            />
            <div className={`absolute left-[208px] top-[504px] flex mx-4`}>
              <img
                src={"/assets/user_avatar_mask.png"}
                alt={"user_avatar_mask"}
                width={376}
                height={376}
              />
              <img
                src={"/assets/user_avatar.png"}
                alt={"user_avatar"}
                width={350}
                height={350}
                className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-50">
              <Modal width={720} height={135} contentClass="justify-center">
                <div className="w-full px-20">
                  <div>SENT TO JAIL FOR NOT PAYING DEBIT ON TIME</div>
                  <div className="w-full flex justify-end">
                    <Button
                      image={"/assets/button_primary.png"}
                      className={"w-[138px] h-[46px]"}
                      text={"BAIL"}
                    />
                  </div>
                </div>
              </Modal>
            </div>
          </>
          :
          <>
            <div className="absolute w-full px-[67px] z-50">
              <div className="w-full flex justify-between items-start">
                <MenuBar />
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px]"}
                  text={"CONNECT"}
                />
              </div>
              <div className="w-full flex justify-end">
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
            </div>
            <img
              src={"/assets/jail_door1.png"}
              alt={"jail_door1"}
              className={`absolute left-[91.92px] z-10 ${isMobile ? isPortrait ? 'top-[282px]' : 'top-[40.97px]' : 'top-[282px]'}`}
            />
            <div className={`absolute left-[208px] ${isMobile ? isPortrait ? 'top-[504px]' : 'top-[262px]' : 'top-[504px]'} flex mx-4`}>
              <img
                src={"/assets/user_avatar_mask.png"}
                alt={"user_avatar_mask"}
                width={376}
                height={376}
              />
              <img
                src={"/assets/user_avatar.png"}
                alt={"user_avatar"}
                width={350}
                height={350}
                className="absolute left-1/2 transform -translate-x-1/2 bottom-0"
              />
            </div>
            <img
              src={"/assets/jail_door2.png"}
              alt={"jail_door2"}
              className={`absolute left-[769.72px] z-10 ${isMobile ? isPortrait ? 'top-[290.97px]' : 'top-[50.97px]' : 'top-[290.97px]'}`}
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-50">
              <Modal width={1328} height={135} contentClass="justify-center">
                <div className="w-full flex justify-between items-center px-40">
                  <div>SENT TO JAIL FOR NOT PAYING DEBIT ON TIME</div>
                  <Button
                    image={"/assets/button_primary.png"}
                    className={"w-[138px] h-[46px]"}
                    text={"BAIL"}
                  />
                </div>
              </Modal>
            </div>
          </>}
      </div >
    </div >
  );
}
