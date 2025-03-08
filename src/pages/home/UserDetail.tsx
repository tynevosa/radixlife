import useDeviceOrientation from "../..//hooks/device";
import { useRadixian } from "../../context";
const UserDetail: React.FC = () => {
  const { isMobile, isPortrait } = useDeviceOrientation();
  const { info, selectedNFT } = useRadixian();

  return (
    <div className={`px-[13px] flex ${!isMobile || isPortrait ? "w-[302px] h-[563px] py-[27px] flex-col" : "h-[270px] py-[12px] gap-6"} items-center rounded-[8.2px] bg-[#0C0C16] border border-black`}>
      <div className={`flex flex-col gap-3 items-center w-[200px]`}>
        <span className="text-[20px]">{selectedNFT} ▼</span>
        <div className="relative flex mx-4">
          <img
            src={"/assets/user_avatar_mask.png"}
            alt={"user_avatar_mask"}
            width={183}
            height={183}
          />
          <img
            src={info?.image}
            alt={"user_avatar"}
            width={180}
            height={180}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-[16px]">AGE</span>
          <div className="relative">
            <img
              src={"/assets/frame_other.png"}
              alt={"frame_other"}
              className="w-[100px] h-[31.62px]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-[14px]">
              {info?.age_range}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[9px] mt-[11.27px]">
        <div className="flex gap-[11px]">
          <img
            src={"/assets/health_bar.png"}
            alt={"health_bar"}
            width={56}
            height={56}
          />
          <div className="relative flex">
            <img
              src={"/assets/frame_progress.png"}
              alt={"frame_progress"}
              width={189.38}
              height={45}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[#22FE60] text-[20px] uppercase">
              {info?.health_status}
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span>GENDER</span>
          <div className="relative flex w-[102px] h-[35px] rounded bg-white/23 px-[30px] py-[8px] items-center justify-center uppercase">
            {info?.gender}
          </div>
        </div>
        <div className="flex gap-[11px] items-center">
          <span className="mr-[15px]">MOOD</span>
          <div className="relative flex">
            <img
              src={"/assets/frame_other.png"}
              alt={"frame_other"}
              width={49}
              height={49}
              className="size-[49px]"
            />
            <img
              src={"/assets/emoji_sad.png"}
              alt={"emoji_sad"}
              width={32}
              height={32}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <span className="uppercase">{info?.mood_status}</span>
        </div>
        <div className="flex w-full gap-3 px-2 items-center bg-[#202020] border border-white/32 rounded-[8.6px]">
          <div className={`relative flex justify-center items-center`}>
            <img
              src={"/assets/frame_avatar.png"}
              alt={"frame_avatar"}
              width={48}
              height={48}
            />
            <img
              src={info?.image}
              alt={"user_avatar"}
              width={48}
              height={48}
              className="absolute scale-70"
            />
          </div>
          <span className="uppercase">{info?.desires?.[0]?.object_name}</span>
        </div>
      </div>
    </div>
  )
}

export default UserDetail;