import Button from "../../components/button";
import { Link } from 'react-router-dom';
import { useRadixian } from "../../context";

const Bank: React.FC = () => {
  const { info } = useRadixian();
  return (
    <div className="w-[320px] h-[378px] px-[22px] flex flex-col items-center rounded-[10px] bg-gradient-to-b from-[#DDBB4B]/15 to-[#999999]/15">
      <div className="flex flex-col items-center gap-[13.53px]">
        <div className="flex items-center gap-2 mt-8">
          <div className="relative flex">
            <img
              src={"/assets/frame_other.png"}
              alt={"frame_other"}
              width={44.58}
              height={44.3}
              className="w-[44.58px] h-[44.3px]"
            />
            <img
              src={"/assets/dollar_bunch.png"}
              alt={"dollar_bunch.png"}
              width={32}
              height={32}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="relative flex">
            <img
              src={"/assets/frame_other_long.png"}
              alt={"frame_other_long"}
              width={211}
              height={44.3}
              className="w-[211px] h-[44.3px]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-[16px]">
              ${info?.bank_account_amount}
            </div>
            <img
              src={"/assets/balance_plus.png"}
              alt={"balance_plus"}
              width={28.3}
              height={28.3}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>
        <img
          src={"/assets/bank.png"}
          alt={"bank"}
          width={276}
          height={135}
        />
        <div className="flex items-center gap-[14px]">
          <span>DEBIT</span>
          <Link to={"/debit"}>
            <div className="relative flex cursor-pointer">
              <img
                src={"/assets/frame_other_long.png"}
                alt={"frame_other_long"}
                width={185}
                height={40}
                className="w-[211px] h-[44.3px]"
              />
              <div className="absolute inset-0 flex items-center justify-center font-[16px] text-[#FF3838]">
                -$252.36
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 mt-[40px]">
        <Button
          image={"/assets/button_primary.png"}
          className={"w-[138px] h-[46px]"}
          text={"DEPOSIT"}
        />
        <Button
          image={"/assets/button_green.png"}
          className={"w-[138px] h-[46px]"}
          text={"WITHDRAW"}
        />
      </div>
    </div>
  )
}

export default Bank;