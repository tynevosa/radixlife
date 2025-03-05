import Button from "../../components/button";

const Store: React.FC = () => {
  return (
    <div className="w-[312px] h-[290px] flex flex-col items-center gap-4">
      <span className="text-[20px]">STORE</span>
      <img
        src={"/assets/store.png"}
        alt={"store"}
        width={293}
        height={297}
      />
      <div className="-mt-15">
        <Button
          image={"/assets/button_secondary.png"}
          className={"w-[206px] h-[46px] text-white"}
          text={"STORE"}
        />
      </div>
    </div>
  )
}

export default Store;