import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from '../../assets/svgs/svg-icons';

interface SelectProps {
  options: string[];
  placeholder?: string;
  value: string | null;
  onChange: (option: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Sortieren nach',
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(event.target instanceof Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center px-4 py-2 border border-gray-light-150 rounded-[8px] bg-white focus:outline-none text-black'
      >
        <span>{value || placeholder}</span>
        <ArrowDown />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-[264px] bg-white rounded-[19px] shadow-lg z-10'>
          <div className='flex flex-col gap-2 p-2'>
            {options.map((option) => {
              const isSelected = value === option;
              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`
                    w-full h-[50px] px-4 text-[15px]
                    flex items-center justify-center text-center
                    rounded-[6px] transition-colors duration-200
                    ${
                      isSelected
                        ? 'bg-blue text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
