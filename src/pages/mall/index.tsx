import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import MenuBar from "../../components/menu";

type Store = {
  pos: {
    left: number,
    top: number,
  },
  image: string,
  navigation: string,
}

const STORES: Store[] = [
  {
    pos: {
      left: 191,
      top: -30,
    },
    image: '/assets/store_weapon.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 617,
      top: 297,
    },
    image: '/assets/store_drug.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 256,
      top: 529,
    },
    image: '/assets/store_magic.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 1066,
      top: 31,
    },
    image: '/assets/store_food.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 362,
      top: 749,
    },
    image: '/assets/store_autocar.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 0,
      top: 95,
    },
    image: '/assets/store_game.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 0,
      top: 706,
    },
    image: '/assets/store_house.png',
    navigation: '/store',
  },
  {
    pos: {
      left: 1035,
      top: 384,
    },
    image: '/assets/store_cloth.png',
    navigation: '/store',
  },
]

export default function Mall() {
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
        className="w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/mall_bg.png)] bg-cover bg-fixed bg-center"
      >
        {isMobile ?
          isPortrait ?
            <div className="flex flex-col gap-6">
              <div className="w-full flex justify-between items-center px-[30px]">
                <MenuBar />
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px]"}
                  text={"CONNECT"}
                />
              </div>
              <div className="w-full flex justify-end items-center px-[30px]">
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
              </div>
            </div>
            :
            <>
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              </div>
              <div className="absolute flex flex-col left-12 gap-8">
                <MenuBar />
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
              </div>
            </>
          :
          <>
            <div className="absolute w-full justify-between items-start px-[67px] pt-[45px] z-50 pointer-events-none">
              <div className="w-full flex justify-between">
                <MenuBar />
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px] pointer-events-auto"}
                  text={"CONNECT"}
                />
              </div>
              <div className="w-full flex justify-end">
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => navigate(-1)}
                />
              </div>
            </div>
            <div className="relative size-full">
              {STORES.map((store, index) => (
                <img
                  key={index}
                  style={store.pos}
                  src={store.image}
                  className="absolute hover:scale-110 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(store.navigation)}
                />
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
}
