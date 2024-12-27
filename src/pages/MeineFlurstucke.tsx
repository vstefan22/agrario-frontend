import { useState, useRef, useEffect } from 'react';
import Search from '../components/common/Search';
import { ArrowDown } from '../assets/svgs/svg-icons';

export default function MeineFlurstucke() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = [
    'Sortieren nach Eignung',
    'Sortieren nach Bundesland',
    'Sortieren nach Größe',
  ];
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[35px] font-bold text-black'>Meine Flurstück</h1>

      <div className='flex mt-6 flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Search placeholder='Search' />

          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='flex items-center px-4 py-2 border border-gray-light-150 rounded-[8px] bg-white focus:outline-none text-black'
            >
              <span>{selectedOption || 'Sortieren nach'}</span>
              <ArrowDown />
            </button>

            {isOpen && (
              <div className='absolute right-0 mt-2 w-[264px] bg-white rounded-[19px] shadow-lg z-10'>
                <div className='flex flex-col gap-2 p-2'>
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className={`w-full h-[50px] px-4 text-[15px] flex items-center justify-center text-center bg-gray-100 ${
                        selectedOption === option
                          ? 'bg-blue text-white'
                          : 'text-black'
                      } hover:bg-gray-200 rounded-[6px] transition-colors duration-200`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className='w-full h-[250px] bg-white rounded-[18px] p-8'
          style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
        >
          {/* Content goes here */}
        </div>

        <div
          className='w-full h-[250px] bg-white rounded-[18px] p-8'
          style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
        >
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
}
