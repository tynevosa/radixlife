import { useEffect, useState } from "react";
import { useRadixian } from "../../context";

const UserStatus: React.FC = () => {
  const { info, selectedNFT, setSelectedNFT, dAppToolkit, setNFTs } = useRadixian();
  const [name, setName] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setName(selectedNFT?.name || selectedNFT?.id);
  }, [selectedNFT]);

  const changeName = () => {
    if (!name) return;
    if (!selectedNFT) return;
    if (name === selectedNFT.name) return;
    if (!dAppToolkit) return;
    const wallet = dAppToolkit.walletApi.getWalletData()?.accounts[0]['address'];
    if (!wallet) return;
    const id = selectedNFT.id;
    const changedName = name;
    dAppToolkit.walletApi.sendTransaction({
      transactionManifest: `
        CALL_METHOD
          Address("${wallet}")
          "create_proof_of_non_fungibles"
          Address("resource_tdx_2_1nta73wetyu8jz4yn2m0femd532u3l4th7lutf645te4leqjhpmlwud")
          Array<NonFungibleLocalId>(NonFungibleLocalId("${id}"))
        ;
        POP_FROM_AUTH_ZONE
          Proof("people_proof")
        ;
        CALL_METHOD
          Address("component_tdx_2_1cpyr294csm672ekfcyu6u9fjn8stjcma6snjpz2wdn0eef72psah9x")
          "give_name"
          Proof("people_proof")
          "${changedName}"
        ;`,
    }).then(res => {
      setDisabled(true);
      if (res.isOk()) {
        setSelectedNFT({
          id: id,
          name: changedName,
        })
        setNFTs(prev => prev.map((item) =>
          item.id === id ? { ...item, name: changedName } : item
        ))
      }
    })
  }

  return (
    <div className="w-[488px] h-[138px] flex gap-2">
      <div className={`relative flex justify-center items-center`}>
        <img
          src={"/assets/frame_avatar.png"}
          alt={"frame_avatar"}
          width={138}
          height={138}
        />
        <img
          src={info?.image}
          alt={"user_avatar"}
          width={138}
          height={138}
          className="absolute scale-70"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="relative">
          <img
            src={"/assets/frame_name.png"}
            alt={"frame_name"}
            width={341.91}
            height={52.83}
          />
          <input value={name} onChange={(e) => setName(e.target.value)} type={`text`} disabled={disabled} className="absolute inset-0 flex items-center justify-start font-[16px] px-6 outline-0" />
          {!selectedNFT?.name ? disabled ?
            <div className="absolute right-4 top-0 flex items-center h-full cursor-pointer" onClick={() => setDisabled(false)}>edit</div>
            :
            <div className="absolute right-4 top-0 flex items-center h-full cursor-pointer">
              <span onClick={changeName}>ok</span>
              &nbsp;|&nbsp;
              <span onClick={() => setDisabled(true)}>cancel</span>
            </div>
            :
            <></>
          }
        </div>
        <div className="flex items-center mr-[18.96px]">
          <span className="mr-3 font-[16px]">AGE</span>
          <div className="relative">
            <img
              src={"/assets/frame_other.png"}
              alt={"frame_other"}
              className="w-[80px] h-[31.62px]"
            />
            <div className="absolute inset-0 flex items-center justify-center font-[16px]">
              {info?.age_range}
            </div>
          </div>
          {/* <img
            src={"/assets/frame_progress.png"}
            alt={"frame_progress"}
            width={225.42}
            height={29.31}
            className="w-[225.42px] h-[29.31px]"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default UserStatus;