import { useEffect, useRef, useState, FC } from 'react';
import { ArrowDown } from '../../assets/svgs/svg-icons';
import EditButton from './EditButton';
import RangeSlider from './RangeSlider';

interface SelectProps {
  name: string;
  options: string[];
  placeholder?: string;
  value: string | null;
  onChange: (name: string, option: string) => void;
  variant?: 'sort' | 'default';
  label?: string;
  required?: boolean;
  onEdit?: () => void;
  divClassName?: string;
  labelClassName?: string;
  divWidthClass?: string;
  buttonClass?: string;
  addRangeSlider?: boolean;
  title?: string;
  details?: string;
}

const Select: FC<SelectProps> = ({
  name,
  options,
  placeholder,
  value,
  onChange,
  variant = 'default',
  label,
  required = false,
  onEdit,
  divClassName,
  labelClassName,
  divWidthClass,
  buttonClass,
  addRangeSlider = false,
  title,
  details,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
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
    onChange(name, option);
    setIsOpen(false);
  };

  const getButtonClasses = () => {
    if (variant === 'sort') {
      return `
        flex items-center px-4 py-2
        border border-gray-light-150
        rounded-[8px] bg-white
        focus:outline-none text-black
      `;
    }
    return `
      flex items-center justify-between
      w-[420px] h-[44px]
      border border-gray-medium/60
      rounded-[8px] bg-white
      focus:outline-none text-black
      px-3 ${buttonClass}
    `;
  };

  return (
    <div className={`${divClassName}`}>
      {variant === 'default' && label && (
        <div className={`flex justify-between ${divWidthClass}`}>
          <label
            className={`
              text-gray-dark-200
              text-[16px]
              font-[400]
              leading-[24px]
              mb-2
              block ${labelClassName}
            `}
            style={{ height: '24px' }}
          >
            {label}
            {required && '*'}
          </label>
          {onEdit && (
            <div className='mt-auto mb-2'>
              <EditButton onClick={onEdit} />
            </div>
          )}
        </div>
      )}

      <div className='relative' ref={dropdownRef}>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={getButtonClasses()}
        >
          <span>{value || placeholder}</span>
          <ArrowDown />
        </button>

        {isOpen && (
          <div className='absolute left-1/3 transform -translate-x-1/2 w-[260px] bg-white rounded-[16px] shadow-lg z-10'>
            <div className='flex flex-col gap-2'>
              {addRangeSlider && (
                <RangeSlider title={title} details={details} />
              )}
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
    </div>
  );
};

export default Select;
