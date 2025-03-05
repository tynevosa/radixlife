const Jail: React.FC = () => {
  return (
    <div className="w-[303px] h-[272px] px-[9px] flex flex-col items-center rounded-[10px] bg-gradient-to-b from-[#DDBB4B]/15 to-[#999999]/15">
      <span className="text-[20px]">JAIL</span>
      <img
        src={"/assets/jail.png"}
        alt={"jail"}
        width={216}
        height={135}
      />
      <div className="flex w-full gap-3 px-2 items-center bg-[#202020] border border-white/32 rounded-[8.6px] -mt-3">
        <div className={`relative flex justify-center items-center`}>
          <img
            src={"/assets/frame_avatar.png"}
            alt={"frame_avatar"}
            width={48}
            height={48}
          />
          <img
            src={"/assets/user_avatar.png"}
            alt={"user_avatar"}
            width={48}
            height={48}
            className="absolute scale-70"
          />
        </div>
        <span>NOT IN PRISON</span>
      </div>
    </div>
  )
}

export default Jail;