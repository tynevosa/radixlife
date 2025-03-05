import Button from "../../components/button";

const Choice: React.FC = () => {
  return (
    <div className="w-[320px] h-[290px] flex flex-col items-center gap-4">
      <span className="text-[20px]">CHOICE</span>
      <div className="w-[301px] h-[177px] text-[#514630] bg-[url(/assets/choice_board.png)] bg-cover p-[13.51px] flex flex-col items-center justify-between">
        <span className="text-[20px]">HUCK BOXING GYM</span>
        <p>
          Lear how to fight to defend yourself
        </p>
        <div className="w-full flex justify-between items-center">
          <Button
            image={"/assets/button_primary.png"}
            className={"w-[160px] h-[41px] text-[12.86px]"}
            text={"Learn How To Fight"}
          />
          <div className="relative">
            <img
              src={"/assets/board_piece.png"}
              alt={"board_piece"}
              width={57.24}
              height={41.16}
              className="w-[57.24px] h-[41.16px]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-[25.73px] text-[#720E20]">
              $10
            </div>
          </div>
        </div>
      </div>
      <Button
        image={"/assets/button_secondary.png"}
        className={"w-[206px] h-[46px] text-white"}
        text={"CHOICE"}
      />
    </div>
  )
}

export default Choice;