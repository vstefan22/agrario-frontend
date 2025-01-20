import { useState } from 'react';
import SearchByAttributes from '../search-with-backup/SearchByAttributes';
import plusIcon from '../../assets/images/plus.png';
import minusIcon from '../../assets/images/minus.png';
import { PlotSearchData } from '../../types/plot-types';

type SearchByAttributesAccordionProps = {
  onSubmit: (formData: PlotSearchData) => void;
};

export default function SearchByAttributesAccordion({
  onSubmit,
}: SearchByAttributesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mt-2 mb-4'>
      <div
        onClick={toggleAccordion}
        className={`relative w-full flex flex-col px-8 py-2 font-medium rounded-[16px] border-[1.5px]
            border-gray-medium/60 transition-all duration-[300ms] cursor-pointer select-none ${
              isOpen
                ? 'bg-white text-gray-dark-100'
                : 'bg-primary-blue text-white border-primary-blue'
            }`}
      >
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-[28px] leading-[48px]'>
            Search by Parcel Attributes
          </h2>
          <img
            src={isOpen ? minusIcon : plusIcon}
            alt='toggle'
            className='w-6 h-6'
          />
        </div>
      </div>

      {isOpen && (
        <div className='mt-4'>
          <SearchByAttributes handleSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}
