interface MenuItemProps {
  icon?: string,
  title: string,
}

const HAVE: MenuItemProps[] = [
  {
    title: 'CLOTH',
  },
  {
    icon: '/assets/icon_home.png',
    title: 'HOUSE',
  },
  {
    icon: '/assets/icon_desire.png',
    title: 'DESIRE',
  }
]

const HaveItem: React.FC<MenuItemProps> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="size-[49.87px] rounded-full bg-[#202020] flex justify-center items-center">
        {props.icon &&
          < img
            src={props.icon}
            alt={props.icon}
            width={30}
            height={30}
            className="absolute flex items-center justify-center"
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
  return (
    <div className="flex gap-3">
      {HAVE.map((h, i) => (
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