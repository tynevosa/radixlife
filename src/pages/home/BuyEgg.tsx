import Button from "../../components/button";

const BuyEgg: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={"/assets/egg.png"}
        alt={"egg"}
        width={120}
        height={107.5}
      />
      <div className="-mt-8">
        <Button
          image={"/assets/button_primary.png"}
          className={"w-[179px] h-[46px]"}
          text={"BUY EGG"}
        />
      </div>
    </div>
  )
}

export default BuyEgg;