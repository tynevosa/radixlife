import Button from "../../components/button";

const Item: React.FC = () => {
  return (
    <div className="w-[252px] h-[288px] flex flex-col items-center">
      <span className="text-[20px] mb-4">OWNED OBJECT</span>
      <img
        src={"/assets/item_box.png"}
        alt={"item_box"}
        width={212}
        height={184}
      />
      <Button
        image={"/assets/button_secondary.png"}
        className={"w-[112.29px] h-[46px] text-white"}
        text={"MY ITEMS"}
      />
    </div>
  )
}

export default Item;