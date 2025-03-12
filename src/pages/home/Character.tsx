import { useRadixian } from "../../context";
import { NFT_INFO } from "../../type/character";
import Dropdown from "../../components/dropdown"; // Adjust the import path

const Character: React.FC = () => {
  const { NFTs, selectedNFT, setSelectedNFT } = useRadixian();

  return (
    <Dropdown
      options={NFTs}
      selectedOption={selectedNFT}
      onSelect={setSelectedNFT}
      renderOption={(NFT: NFT_INFO | undefined) => NFT?.name || NFT?.id || ""} // Handle undefined
      renderSelected={(NFT: NFT_INFO | undefined | null) => NFT?.name || NFT?.id || "Select an NFT"}
      className="w-[194px] h-[44px] rounded-[20px]"
      dropdownClassName="bg-[#202020] rounded-[20px]"
    />
  );
};

export default Character;