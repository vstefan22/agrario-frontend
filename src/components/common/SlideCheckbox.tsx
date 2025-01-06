import React from 'react';

type TSlideCheckboxProps = {
  option1: string;
  option2: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const SlideCheckbox: React.FC<TSlideCheckboxProps> = ({
  option1,
  option2,
  checked,
  onChange,
}) => {
  return (
    <div className='bg-[#2179A1] rounded-3xl'>
      <label className='relative inline-flex items-center cursor-pointer rounded-full bg-blue-600 w-48 h-12 p-1'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='sr-only peer'
        />

        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-blue-400 transition-transform duration-[450ms] ${
            checked ? 'translate-x-[90%] bg-blue' : 'translate-x-0 bg-blue'
          }`}
        ></div>

        <span
          className={`relative z-10 w-1/2 text-center text-sm font-medium transition-colors select-none ${
            checked ? 'text-white/80' : 'text-white'
          }`}
        >
          {option1}
        </span>

        <span
          className={`relative z-10 w-1/2 text-center text-sm font-medium transition-colors select-none ${
            !checked ? 'text-white/80' : 'text-white'
          }`}
        >
          {option2}
        </span>
      </label>
    </div>
  );
};

export default SlideCheckbox;
