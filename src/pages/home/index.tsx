import { createElement, useEffect, useRef, useState } from "react";
import UserStatus from "./UserStatus";
import Menu from "./Menu";
import UserHave from "./UserHave";
import UserDetail from "./UserDetail";
import Bank from "./Bank";
import School from "./School";
import Jail from "./Jail";
import Choice from "./Choice";
import Store from "./Store";
import Item from "./Item";
import Job from "./Job";
import Ocuppation from "./Occupation";
import BuyEgg from "./BuyEgg";
import Character from "./Character";
import useDeviceOrientation from "../../hooks/device";
import { useRadixian } from "../../context";

const MAX_HEIGHT = 378;
const ELEMENTS_SIZES: { width: number; height: number }[] = [
  {
    width: 425,
    height: 270,
  },
  {
    width: 320,
    height: 378,
  },
  {
    width: 303,
    height: 272,
  },
  {
    width: 303,
    height: 272,
  },
  {
    width: 320,
    height: 290,
  },
  {
    width: 312,
    height: 290,
  },
  {
    width: 226,
    height: 282,
  },
  {
    width: 252,
    height: 288,
  },
  {
    width: 282,
    height: 183,
  },
  {
    width: 179,
    height: 123,
  },
]

export default function Home() {
  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const contentRef = useRef<HTMLDivElement>(null);

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
    // isMobile && !isPortrait && updateSizes();
  }

  useEffect(() => {
    updateScale();
  }, [windowSize, isMobile, isPortrait]);

  useEffect(() => {
    updateScale();
  }, [])

  const { info } = useRadixian();
  const { choices, jailed, schooling, occupation } = info ?? {};

  return (
    isMobile ?
      isPortrait ?
        <div className="relative overflow-y-scroll bg-[url(/assets/home_bg.png)] w-full h-screen bg-cover bg-fixed bg-center">
          <div
            className="relative w-full h-full"
            style={{
              transform: `scale(${scaleX}, ${scaleY})`,
              transformOrigin: "top left",
            }}
          >
            <div className="absolute left-[30px] top-[46px]">
              <Menu />
            </div>
            <div className="absolute left-[340px] top-[52px]">
              <Character />
            </div>
            <div className="absolute left-[30px] top-[130px]">
              <UserStatus />
            </div>
            <div className="absolute left-[199px] top-[250px]">
              <UserHave />
            </div>
            <div className="flex w-full gap-6 px-[30px] pt-[340px] pb-16">
              <div className="flex flex-col items-center gap-6">
                <UserDetail />
                <Job />
                {occupation &&
                  <Ocuppation />
                }
                <Item />
                <BuyEgg />
              </div>
              <div className="flex flex-col items-center gap-6">
                <Bank />
                {schooling &&
                  <School />
                }
                {jailed &&
                  <Jail />
                }
                {choices?.length ?
                  <Choice choices={choices} />
                  : <></>
                }
                <Store />
              </div>
            </div>
            <div className="absolute left-[480px] top-[100px]">
              {/* <Button
                image={"/assets/button_primary.png"}
                className={"w-[206px] h-[55px]"}
                text={"CONNECT"}
              /> */}
              {createElement("radix-connect-button")}
            </div>
          </div >
        </div>
        :
        <div className="relative bg-[url(/assets/home_bg.png)] w-screen h-screen bg-cover bg-fixed bg-center">
          <div className="h-[100vh] flex flex-col justify-between gap-4 overflow-hidden">
            <div
              className="flex flex-col gap-4 w-[1440px] p-4 items-center justify-center"
              style={{
                transform: `scale(${scaleX}, ${scaleY})`,
                transformOrigin: "top left",
              }}
            >
              <div className="flex items-center gap-4">
                <UserStatus />
                <UserHave />
                <Menu />
                <Character />
                {createElement("radix-connect-button")}
              </div>
              <div ref={contentRef} className="w-full flex gap-4 overflow-x-scroll overflow-y-hidden">
                {[
                  <UserDetail />,
                  <Bank />,
                  schooling ? <School /> : undefined,
                  jailed ? <Jail /> : undefined,
                  choices?.length ? <Choice choices={choices} /> : undefined,
                  <Store />,
                  <Job />,
                  <Item />,
                  occupation ? <Ocuppation /> : undefined,
                  <BuyEgg />,
                ].map((Component, index) => {
                  if (Component === undefined) return <></>;
                  const size = ELEMENTS_SIZES[index] || { width: 1, height: 1 }; // Default values prevent division by zero
                  const scale = MAX_HEIGHT / size.height;
                  const marginRight = Math.abs(1 - scale) * size.width;
                  return (
                    <div
                      key={index}
                      style={{
                        transform: `scale(${scale / (index === 9 ? 2 : 1)})`,
                        transformOrigin: "top left",
                        marginRight: `${marginRight}px`,
                      }}
                    >
                      {Component}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div >
      :
      <div className="relative w-[100vw] h-[100vh] overflow-hidden">
        <div
          style={{
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top left",
          }}
          className="w-[1440px] h-[1024px] relative bg-[url(/assets/home_bg.png)]"
        >
          <div className="absolute left-[53px] top-[27px]">
            <UserStatus />
          </div>
          <div className="absolute left-[664px] top-[46px]">
            <Menu />
          </div>
          <div className="absolute left-[199px] top-[149px]">
            <UserHave />
          </div>
          <div className="absolute left-[49px] top-[237px] ">
            <UserDetail />
          </div>
          <div className="absolute left-[386px] top-[249px]">
            <Bank />
          </div>
          <div className="absolute left-[745px] top-[157px]">
            {schooling &&
              <School />
            }
          </div>
          <div className="absolute left-[745px] top-[447px]">
            {jailed &&
              <Jail />
            }
          </div>
          <div className="absolute left-[1082px] top-[148px]">
            {choices?.length ?
              <Choice choices={choices} />
              : <></>
            }
          </div>
          <div className="absolute left-[1083px] top-[469px]">
            <Store />
          </div>
          <div className="absolute left-[773px] top-[738px]">
            <Item />
          </div>
          <div className="absolute left-[423px] top-[675px]">
            <Job />
          </div>
          <div className="absolute left-[1110px] top-[790px]">
            {occupation &&
              <Ocuppation />
            }
          </div>
          <div className="absolute left-[121px] top-[813px]">
            <BuyEgg />
          </div>
          <div className="absolute left-[977px] top-[52px]">
            <Character />
          </div>
          <div className="absolute left-[1204px] top-[45px]">
            {createElement("radix-connect-button")}
          </div>
        </div >
      </div>
  );
}
