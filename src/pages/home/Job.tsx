import Button from "../../components/button";

const Job: React.FC = () => {
  return (
    <div className="w-[226px] h-[282px] flex flex-col items-center rounded-[8.6px] bg-gradient-to-b from-[#EA3939]/25 to-[#7D3434]/25 border-y border-white/32">
      <div className="w-[200px] h-[83px] bg-[#202020] rounded-[10px] border-t border-[#EB8D36] flex items-center justify-center mt-[39px]">
        <span className="text-[20px]">RUN AN ERRAN</span>
      </div>
      <div className="flex flex-col gap-1 mt-[25px]">
        <Button
          image={"/assets/button_primary.png"}
          className={"w-[179px] h-[46px]"}
          text={"ACCEPT JOB"}
        />
        <Button
          image={"/assets/button_red.png"}
          className={"w-[179px] h-[46px] text-white"}
          text={"DECLINE"}
        />
      </div>
    </div>
  )
}

export default Job;