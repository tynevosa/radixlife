import { useEffect, useRef, useState } from "react";

interface DropdownProps<T> {
  options: T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  renderOption: (option: T) => React.ReactNode;
  renderSelected: (option: T | null) => React.ReactNode;
  className?: string;
  dropdownClassName?: string;
  borderRadius?: number;
}

const Dropdown = <T,>({
  options,
  selectedOption,
  onSelect,
  renderOption,
  renderSelected,
  className = "",
  dropdownClassName = "",
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const handleSelect = (option: T) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col justify-center bg-[#202020] border-y border-white/32 ${isOpen && 'rounded-b-none'} cursor-pointer select-none pointer-events-auto ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="px-4 flex justify-between">
        {renderSelected(selectedOption)}
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className={`absolute top-full w-full bg-[#202020] border-b border-white/32 overflow-hidden rounded-t-none shadow-lg z-50 ${dropdownClassName}`}>
          {options
            .filter((option) => option !== selectedOption)
            .map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`block px-4 py-2 hover:bg-gray-100 hover:text-black transition-all`}
              >
                {renderOption(option)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;