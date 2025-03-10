import { useNavigate } from "react-router-dom";
import { createElement, useEffect, useMemo, useState } from "react";
import useDeviceOrientation from "../../hooks/device";
import Egg from "./egg";
import { fetchEggCount } from "../../api/egg";
import { useRadixian } from "../../context";
import { formatTime } from "../../utils/time";

interface HatchModalProps {
  time: number;
}

const HatchModal: React.FC<HatchModalProps> = (props) => {
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(props.time);
  const [hour, minute, second] = useMemo(() => formatTime(time).split(":"), [time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    if (!time) {
      navigate('/')
    }
  }, [time])

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center transition-all duration-200"
    >
      {/* Modal content with animation */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className="relative rounded-lg transform transition-all duration-300 scale-95 z-50"
      >
        <div className="relative">
          <img
            src={`/assets/eggstore_modal.png`}
          />
          <div className="absolute inset-0 flex justify-center">
            <img
              src={`/assets/egg.png`}
              className="absolute bottom-24 scale-150"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {/* progress bar */}
          <div className="w-[290px] rounded-[5.86px] p-1 bg-white/23 border border-[#F7AD0B]">
            <div
              className="h-[19px] rounded-[5.86px] bg-[#F7AD0B]"
              style={{
                width: `${time / props.time * 100}%`
              }}
            />
          </div>
          <span className="text-[32px] mt-[29.1px] mb-[11px]" style={{ WebkitTextStroke: '1px black' }}>HATCHING</span>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col items-center gap-[9px]">
              <div className="w-[68px] h-[62px] bg-[#202020] rounded border-y border-white/32 flex flex-col items-center justify-center text-2xl">{hour}</div>
              <div className="col-span-1">Hr</div>
            </div>
            <div className="flex flex-col gap-1 h-[62px] justify-center">
              <div className="size-2 border border-white/32 bg-[#202020] rounded-full" />
              <div className="size-2 border border-white/32 bg-[#202020] rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-[9px]">
              <div className="w-[68px] h-[62px] bg-[#202020] rounded border-y border-white/32 flex flex-col items-center justify-center text-2xl">{minute}</div>
              <div className="col-span-1">Min</div>
            </div>
            <div className="flex flex-col gap-1 h-[62px] justify-center">
              <div className="size-2 border border-white/32 bg-[#202020] rounded-full" />
              <div className="size-2 border border-white/32 bg-[#202020] rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-[9px]">
              <div className="w-[68px] h-[62px] bg-[#202020] rounded border-y border-white/32 flex flex-col items-center justify-center text-2xl">{second}</div>
              <div className="col-span-1">Sec</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BoardProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Board: React.FC<BoardProps> = (props) => {
  const [count, setCount] = useState<number>(1000);

  useEffect(() => {
    fetchEggCount().then(value => setCount(value.remaining_eggs));
  }, [])

  return (
    <div
      {...props}
    >
      <div className="w-full flex justify-center">
        <img src={`/assets/eggstore_board.png`} />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 pt-4 w-full flex flex-col gap-2 items-center justify-center">
        <p className="text-[#B45A1E] text-[17px]">Total number of egg remaining</p>
        <div className="flex">
          {count.toString().split('').map((num, index) => (
            <div key={index} className="relative">
              <img
                src={`/assets/label1.png`}
              />
              <span className="text-[58px] text-[#720E20] absolute inset-0 flex items-center justify-center">{num}</span>
            </div>
          ))}
        </div>
        <div className="relative">
          <img
            src={`/assets/label2.png`}
          />
          <span className="text-[21px] text-[#720E20] absolute inset-0 flex items-center justify-center">1 EGG = 300XRD</span>
        </div>
      </div>
    </div>
  )
}

export default function EggStore() {
  const { isMobile, isPortrait, windowSize } = useDeviceOrientation();
  const { dAppToolkit } = useRadixian();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const openBuyModal = () => setIsBuyOpen(true);
  const closeBuyModal = () => setIsBuyOpen(false);

  const [isHatchOpen, setIsHatchOpen] = useState(false);
  const openHatchModal = () => setIsHatchOpen(true);

  const buyEgg = () => {
    if (!dAppToolkit) return;
    const wallet = dAppToolkit.walletApi.getWalletData()?.accounts[0]['address'];
    if (!wallet) return
    dAppToolkit.walletApi.sendTransaction({
      transactionManifest: `
        CALL_METHOD
          Address("${wallet}")
          "withdraw"
          Address("resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc")
          Decimal("300")
        ;
        TAKE_ALL_FROM_WORKTOP
          Address("resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc")
          Bucket("xrd_bucket")
        ;
        CALL_METHOD
          Address("component_tdx_2_1cpyr294csm672ekfcyu6u9fjn8stjcma6snjpz2wdn0eef72psah9x")
          "buy_egg"
          Bucket("xrd_bucket")
        ;
        CALL_METHOD
          Address("${wallet}")
          "deposit_batch"
          Expression("ENTIRE_WORKTOP")
        ;`,
    }).then(res => {
      if (res.isOk()) {
        closeBuyModal()
        openHatchModal()
      }
    })
  }

  const updateScale = () => {
    // Set the div's original width and height (example: 500px by 300px)
    const originalWidth = isMobile ? isPortrait ? 550 : 1440 : 1440;
    const originalHeight = isMobile ? isPortrait ? 1024 : 785 : 1024;

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
          width: `${isMobile ? isPortrait ? 550 : 1440 : 1440}px`,
          height: `${isMobile ? isPortrait ? 1024 : 785 : 1024}px`,
        }}
        className={`w-[1440px] h-[1024px] asbolute inset-0 relative bg-[url(/assets/egg_bg.png)] bg-cover bg-fixed py-[47px] ${isMobile && isPortrait ? 'bg-left' : 'bg-bottom'}`}
      >
        {/* egg store nameplate */}
        <div
          className="absolute inset-0"
        >
          <img src={`/assets/eggstore_nameplate.png`} />
          <div className="absolute inset-0 text-[#720E20] text-[50px] left-[51px] top-[77px]">
            EGG STORE
          </div>
        </div>
        {isMobile ?
          isPortrait ?
            <>
              <div className="absolute top-60 w-full justify-center">
                {/* board */}
                <Board />
              </div>
              <div className="absolute bottom-12 w-full flex justify-center">
                {/* table 1 */}
                <div className="relative">
                  <img src={`/assets/egg_table.png`} />
                  <Egg
                    style={{
                      left: 70,
                      top: -100,
                    }}
                    className="absolute"
                    onClick={openBuyModal}
                  />
                </div>
              </div>
            </>
            :
            <>
              {/* board */}
              <Board className="absolute left-[1062px] top-[150px]" />
              {/* cushion 3 */}
              <div
                style={{
                  left: 450,
                  bottom: 100,
                }}
                className="absolute"
              >
                <img src={`/assets/egg_cushion3.png`} />
                <Egg
                  style={{
                    left: 80,
                    top: 20,
                  }}
                  className="absolute"
                  onClick={openBuyModal}
                />
              </div>
              {/* cushion 2 */}
              <div
                style={{
                  left: 100,
                  bottom: 50,
                }}
                className="absolute"
              >
                <img src={`/assets/egg_cushion2.png`} />
                <Egg
                  style={{
                    left: 70,
                    top: -60,
                  }}
                  className="absolute"
                  onClick={openBuyModal}
                />
              </div>
              {/* cushion 1 */}
              <div
                style={{
                  left: 1135,
                  bottom: 50,
                }}
                className="absolute"
              >
                <img src={`/assets/egg_cushion1.png`} />
                <Egg
                  style={{
                    left: 50,
                    top: -100,
                  }}
                  className="absolute"
                  onClick={openBuyModal}
                />
              </div>
            </>
          :
          <>
            {/* shelf 2 */}
            <div
              style={{
                left: 362.48,
                top: 277.06,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_shelf.png`} />
              <Egg
                style={{
                  left: 115,
                  top: 200,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
              <Egg
                style={{
                  left: 115,
                  top: 32,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* table 1 */}
            <div
              style={{
                left: -46,
                top: 757.76,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_table.png`} className="scale-125" />
              <Egg
                style={{
                  left: 55,
                  top: -120,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* table 2 */}
            <div
              style={{
                left: 398,
                top: 734,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_table.png`} />
              <Egg
                style={{
                  left: 70,
                  top: -100,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* cushion 2 */}
            <div
              style={{
                left: 401,
                top: 898,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_cushion2.png`} />
              <Egg
                style={{
                  left: 70,
                  top: -60,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* cushion 3 */}
            <div
              style={{
                left: 856,
                top: 592,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_cushion3.png`} />
              <Egg
                style={{
                  left: 80,
                  top: 20,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* cushion 1 */}
            <div
              style={{
                left: 1135,
                top: 838,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_cushion1.png`} />
              <Egg
                style={{
                  left: 50,
                  top: -100,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>
            {/* cushion 4 */}
            <div
              style={{
                left: 782,
                top: 925,
              }}
              className="absolute"
            >
              <img src={`/assets/egg_cushion4.png`} />
              <Egg
                style={{
                  left: 80,
                  top: -90,
                }}
                className="absolute"
                onClick={openBuyModal}
              />
            </div>

            {/* board */}
            <Board className="absolute left-[1062px] top-[237px]" />
          </>
        }
        <div className="absolute right-[30px] top-[45px]">
          {createElement("radix-connect-button")}
        </div>
        {/* Modal backdrop and container */}
        {isBuyOpen && (
          <div
            onClick={closeBuyModal}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-all duration-200"
          >
            {/* Modal content with animation */}
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              className="relative rounded-lg shadow-lg transform transition-all duration-300 scale-95 z-50"
            >
              <img
                src={`/assets/eggstore_modal.png`}
              />
              <div className="absolute inset-0 flex flex-col items-center">
                <div className="absolute w-full flex justify-between bottom-0 px-8">
                  <img
                    src={`/assets/bush.png`}
                  />
                  <img
                    src={`/assets/bush.png`}
                    className="scale-x-[-1]"
                  />
                </div>
                <img
                  src={`/assets/egg.png`}
                  className="absolute bottom-20 scale-150"
                />
                <div className="absolute bottom-0">
                  <img
                    src={`/assets/label3.png`}
                  />
                  <span className="absolute inset-0 flex flex-col size-full items-center justify-center text-[#720E20] text-[45px] cursor-pointer select-none hover:text-yellow-400" onClick={buyEgg}>BUY EGG</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {isHatchOpen && <HatchModal time={30} />}
      </div >
    </div >
  );
}
