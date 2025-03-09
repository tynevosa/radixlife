import { useEffect, useRef, useState } from "react";
import { useRadixian } from "../../context";
import { NFT_INFO } from "../../type/character";

const Character: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { NFTs, selectedNFT, setSelectedNFT } = useRadixian();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (NFT: NFT_INFO) => {
    setIsOpen(false);
    setSelectedNFT(NFT);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-[194px] h-[44px] flex flex-col items-center justify-center bg-[#202020] border-y border-white/32 ${isOpen ? 'rounded-t-[20px]' : 'rounded-[20px]'} cursor-pointer select-none`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {selectedNFT?.name || selectedNFT?.id}  {isOpen ? '▲' : '▼'}

      {isOpen && (
        <div className="absolute top-full w-full bg-[#202020] border-b border-white/32 rounded-b-[20px] shadow-lg z-50">
          {NFTs.filter(NFT => NFT !== selectedNFT).map((NFT, index) => (
            <a
              key={index}
              href="#"
              onClick={() => handleSelect(NFT)}
              className={`block px-4 py-2 hover:bg-gray-100 hover:text-black transition-all last:rounded-b-[20px]`}
            >
              {NFT.name || NFT.id}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default Character;