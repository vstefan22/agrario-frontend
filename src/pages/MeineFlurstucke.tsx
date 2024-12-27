import { useState, useRef, useEffect } from 'react';

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
          <div className='flex items-center border border-gray-light-150 bg-white rounded-[8px] overflow-hidden'>
            <button className='pl-3 py-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 01-1.414 1.414l-4.387-4.386zM14 8a6 6 0 11-12 0 6 6 0 0112 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <input
              type='text'
              placeholder='Search...'
              className='px-4 py-2 focus:outline-none'
            />
          </div>

          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='flex items-center px-4 py-2 border border-gray-light-150 rounded-[8px] bg-white focus:outline-none text-black'
            >
              <span>{selectedOption || 'Sortieren nach'}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
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
                          ? 'bg-[#337FA2] text-white'
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
