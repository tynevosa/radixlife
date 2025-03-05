import React, { useState } from "react";
import Menu from "../pages/home/Menu";
import Character from "../pages/home/Character";
import useDeviceOrientation from "../hooks/device";

const MenuBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const { isPortrait } = useDeviceOrientation();

  return (
    <div className="relative flex">
      <label htmlFor="toggle">
        <input type="checkbox" id="toggle" onChange={(e) => setShow(e.target.checked)} className="peer hidden" />
        <img
          src="/assets/menu_hamburger.png"
          alt="menu_hamburger"
          width="91"
          height="90"
          className="cursor-pointer hover:opacity-80 transition-transform duration-200 active:scale-80"
        />
      </label>
      <div className={`absolute left-full top-1/2 ml-[23px] select-none ${show ? 'opacity-100' : 'opacity-0'} flex ${isPortrait ? 'flex-col gap-3' : 'flex-row justify-between items-center w-[943px] h-[138px]'} transition-all duration-200 -translate-y-[69px]`}>
        <div className={`relative flex items-center`}>
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
        <div className={`flex gap-4 ${isPortrait && '-translate-x-[114px]'}`}>
          <Menu />
          <Character />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
