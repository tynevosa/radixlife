import { useRadixian } from "../../context";

const UserStatus: React.FC = () => {
  const { info, selectedNFT } = useRadixian();

  return (
    <div className="w-[488px] h-[138px] flex gap-2">
      <div className={`relative flex justify-center items-center`}>
        <img
          src={"/assets/frame_avatar.png"}
          alt={"frame_avatar"}
          width={138}
          height={138}
        />
        <img
          src={info?.image}
          alt={"user_avatar"}
          width={138}
          height={138}
          className="absolute scale-70"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="relative">
          <img
            src={"/assets/frame_name.png"}
            alt={"frame_name"}
            width={341.91}
            height={52.83}
          />
          <div className="absolute inset-0 flex items-center justify-start font-[16px] px-6">
            {selectedNFT}
          </div>
        </div>
        <div className="flex items-center mr-[18.96px]">
          <span className="mr-3 font-[16px]">AGE</span>
          <div className="relative">
            <img
              src={"/assets/frame_other.png"}
              alt={"frame_other"}
              className="w-[150px] h-[31.62px]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-[16px]">
              {info?.age_range}
            </div>
          </div>
          <img
            src={"/assets/frame_progress.png"}
            alt={"frame_progress"}
            width={225.42}
            height={29.31}
            className="w-[225.42px] h-[29.31px]"
          />
        </div>
      </div>
    </div>
  )
}

export default UserStatus;