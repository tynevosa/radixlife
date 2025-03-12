import { useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Button from "../../components/button";
import Label from "../../components/label";
import Dropdown from "../../components/dropdown";
import Slider from "../../components/slider";

type ItemModalProps = {
  width: number,
  height: number,
}

const ItemModal: React.FC<PropsWithChildren<ItemModalProps>> = ({
  children,
  ...props
}) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
      }}
      className="relative"
    >
      <img
        src={"/assets/frame_info.png"}
        alt={"frame_info"}
        className="absolute size-full object-fill"
      />
      <div
        className="absolute w-full h-full flex flex-col items-center -z-10"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
          background: 'radial-gradient(circle, #613131 0%, #582C2C 38%, #472323 81%, #3B1919 100%)',
        }}
      />
      <div
        className="absolute w-full h-full overflow-hidden"
        style={{
          clipPath: 'polygon(5% 8%, 50% 2%, 95% 8%, 95% 92%, 50% 98%, 5% 92%)', // Creates the cropped corners
        }}
      >
        {children}
      </div>
    </div>
  )
}

const SearchBar = () => {
  return (
    <div className="relative">
      <input type="search" id="default-search" className="block w-full py-3 px-[10px] border-y border-white/32 bg-[#202020] rounded placeholder:text-white outline-0 text-white" placeholder="Search" required />
      <div className="absolute -inset-y-0 end-4 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
    </div>
  )
}

const SORT_OPTIONS = [
  'LOWEST PRICE',
  'HEIGHEST PRICE',
]

const StoreModal = () => {
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0]);
  return (
    <div className="w-[1339px] h-[865px] relative">
      <img
        src={"/assets/frame_item.png"}
        alt={"frame_item"}
        className="absolute w-[1339px] h-[865px] object-fill"
      />
      <div
        className="absolute w-full h-full bg-black flex flex-col items-center -z-10"
        style={{
          clipPath: 'polygon(8% 3%, 92% 3%, 97% 10%, 96% 91%, 91% 97%, 9% 97%, 4% 91%, 3% 10%)', // Creates the cropped corners
          background: 'radial-gradient(circle, #613131 0%, #582C2C 38%, #472323 81%, #3B1919 100%)',
        }}
      />
      <div
        className="absolute w-full h-full overflow-hidden px-16 py-8"
        style={{
          clipPath: 'polygon(8% 3%, 92% 3%, 97% 10%, 96% 91%, 91% 97%, 9% 97%, 4% 91%, 3% 10%)', // Creates the cropped corners
        }}
      >
        <div className="w-full h-full flex flex-col px-12">
          <div className="flex w-full items-center justify-between mt-10">
            <div className="flex items-center gap-4">
              <span>SORT BY</span>
              <Dropdown
                options={SORT_OPTIONS}
                selectedOption={sortBy}
                onSelect={setSortBy}
                renderOption={(sort: string | undefined) => sort || ""} // Handle undefined
                renderSelected={(sort: string | undefined | null) => sort}
                className="w-[231px] py-3 rounded"
                dropdownClassName="bg-[#202020] rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>PRICE</span>
              <Slider />
              <div className="flex justify-between">
                <span className="text-xs">10XRB</span>
                <span className="text-xs">100000XRB</span>
              </div>
            </div>
            <SearchBar />
          </div>
          <div className="grid grid-cols-4 gap-y-[41.62px] gap-x-[52.62px] flex-1 overflow-y-scroll overflow-x-hidden mt-[31.68px]">
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
            <ItemModal width={245.54} height={329.8}>

            </ItemModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Store() {
  const navigate = useNavigate();

  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const updateScale = () => {
    // Set the div's original width and height (example: 500px by 300px)
    const originalWidth = isMobile ? isPortrait ? 700 : 1440 : 1440;
    const originalHeight = isMobile ? isPortrait ? 1150 : 665 : 1024;

    // Calculate scale factors for both axes
    const scaleX = windowSize.width / originalWidth;
    const scaleY = windowSize.height / originalHeight;

    // Update state with the new scale factors
    setScaleX(scaleX);
    setScaleY(scaleY);
  }

  useEffect(() => {
    updateScale();
  }, [windowSize, isMobile, isPortrait]);

  useEffect(() => {
    updateScale();
  }, [])

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <div
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          width: `${isMobile ? isPortrait ? 700 : 1440 : 1440}px`,
          height: `${isMobile ? isPortrait ? 1150 : 665 : 1024}px`,
        }}
        className="w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/store_weapon_bg.png)] bg-cover bg-fixed bg-center py-[47px]"
      >
        {isMobile ?
          isPortrait ?
            <div className="flex flex-col gap-6">
              <div className="w-full flex justify-end items-center px-[30px]">
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="w-full flex justify-center mt-16">
              </div>
            </div>
            :
            <>
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              </div>
              <div className="absolute flex flex-col left-12 gap-8">
              </div>
              <div className="absolute flex flex-col justify-between right-12 gap-8 items-end">
                <Button
                  image={"/assets/button_primary.png"}
                  className={"w-[206px] h-[55px]"}
                  text={"CONNECT"}
                />
                <img
                  src={"/assets/back.png"}
                  alt={"back"}
                  width={79}
                  height={79}
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
              </div>
            </>
          :
          <>
            <div className="relative w-full flex justify-center px-[67px]">
              <Label image={`/assets/store_nameplate.png`} className={"text-white text-[27px]"}>WEAPON</Label>
              <img
                src={"/assets/back.png"}
                alt={"back"}
                width={79}
                height={79}
                className="absolute right-0 cursor-pointer"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="w-full flex justify-center">
              <StoreModal />
            </div>
          </>
        }
      </div>
    </div>
  );
}
