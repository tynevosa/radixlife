import { PropsWithChildren } from "react";

type ModalProps = {
  width: number,
  height: number,
  backgroundClass?: string,
  contentClass?: string,
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  width = 497,
  height = 389,
  backgroundClass,
  contentClass,
  children,
}) => {
  return (
    <div className="relative"
      style={{
        width,
        height,
      }}
    >
      <img
        src={"/assets/frame_info.png"}
        alt={"frame_info"}
        className="absolute object-fill"
        style={{
          width,
          height,
        }}
      />
      <div
        className={`absolute w-full h-full bg-black -z-10 ${backgroundClass}`}
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)',
        }}
      />
      <div
        className={`absolute w-full h-full flex flex-col overflow-hidden ${contentClass}`}
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal;