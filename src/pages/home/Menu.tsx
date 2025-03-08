import { Link } from "react-router-dom";
import { useRadixian } from "../../context";
import { useMemo } from "react";

interface MenuProps {
  className?: string,
}

interface MenuItemProps {
  frame: string,
  icon: string,
  title: string,
  navigation: string,
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  return (
    <Link
      to={props.navigation}
      className="flex flex-col items-center"
    >
      <div className="relative flex cursor-pointer">
        <img
          src={props.frame}
          alt={props.frame}
          width={63.94}
          height={59.91}
          className="w-[63.94px] h-[59.91px]"
        />
        <img
          src={props.icon}
          alt={props.icon}
          width={40.08}
          height={37.61}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${props.icon === '/assets/icon_notification_warn.png' && 'alarm-shake'}`}
        />
      </div>
      <span className="text-[14px]">
        {props.title}
      </span>
    </Link>
  )
}

const Menu: React.FC<MenuProps> = (props) => {
  const { info } = useRadixian();
  const menu = useMemo(() => {
    let default_menu: MenuItemProps[] = [{
      frame: '/assets/frame_other.png',
      icon: '/assets/icon_notification.png',
      title: 'NOTIFICATION',
      navigation: '/',
    },
    {
      frame: '/assets/frame_other.png',
      icon: '/assets/icon_log.png',
      title: 'LOG',
      navigation: '/log',
    },
    {
      frame: '/assets/frame_other.png',
      icon: '/assets/icon_chat.png',
      title: 'CHAT',
      navigation: '/',
    }]
    if (info) {
      const { clothing, living_in, desires } = info;
      if (!(clothing && living_in && desires)) default_menu[0].icon = '/assets/icon_notification_warn.png';
    }
    return default_menu;
  }, [info]);

  return (
    <div className={`flex gap-[26px] ${props.className}`}>
      {menu.map((m, i) => (
        <MenuItem
          key={i}
          {...m}
        />
      ))}
    </div>
  )
}

export default Menu;