import { useMemo } from "react"
import { useRadixian } from "../../context"

interface MenuItemProps {
  icon?: string,
  title: string,
}

const HaveItem: React.FC<MenuItemProps> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="size-[49.87px] rounded-full border-y border-white/32 bg-[#202020] flex justify-center items-center cursor-pointer hover:border-white transition-colors">
        {props.icon &&
          < img
            src={props.icon}
            alt={props.icon}
            width={40}
            height={40}
            className="absolute flex items-center justify-center rounded-full"
          />
        }
      </div>
      <span className="text-[14px]">
        {props.title}
      </span>
    </div>
  )
}

const UserHave: React.FC = () => {
  const { info } = useRadixian();

  const have = useMemo(() => {
    let default_have: MenuItemProps[] = [{
      title: 'CLOTH',
    },
    {
      title: 'HOUSE',
    },
    {
      title: 'DESIRE',
    }]
    if (info) {
      const { purchasable_objects, desires, living_in_image, clothing_image } = info;
      const object_name = desires?.[0]?.object_name;
      const desire_object = purchasable_objects?.find((purchasable_object: any) => purchasable_object.name === object_name)
      default_have[2]['icon'] = desire_object?.object_image;
      default_have[1]['icon'] = living_in_image;
      default_have[0]['icon'] = clothing_image;
    }
    return default_have;
  }, [info]);

  return (
    <div className="flex gap-3">
      {have.map((h, i) => (
        <HaveItem
          key={i}
          icon={h.icon}
          title={h.title}
        />
      ))}
    </div>
  )
}

export default UserHave;