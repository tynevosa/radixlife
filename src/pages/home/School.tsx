import Button from "../../components/button";

const School: React.FC = () => {
  return (
    <div className="w-[303px] h-[272px] px-[9px] py-[17px] flex flex-col items-center rounded-[10px] bg-gradient-to-b from-[#DDBB4B]/15 to-[#999999]/15">
      <span className="text-[20px]">SCHOOL</span>
      <img
        src={"/assets/school.png"}
        alt={"school"}
        width={276}
        height={135}
      />
      <Button
        image={"/assets/button_secondary.png"}
        className={"w-[206px] h-[46px] text-white"}
        text={"SCHOOL"}
      />
    </div>
  )
}

export default School;