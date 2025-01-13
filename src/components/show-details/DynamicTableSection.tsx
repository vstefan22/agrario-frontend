import { useState } from 'react';
import DynamicTable from '../common/DynamicTable';
import arrowUpImg from '../../assets/images/arrow-circle-up.png';
import arrowDownImg from '../../assets/images/arrow-circle-down.png';

type SectionTableProps = {
  title: string;
  description?: string;
  columns: { key: string; label: string }[];
  data: Record<string, unknown>;
  image: string;
  customClassName?: string;
  verticalRightClassName?: string;
  blurKeys?: string[];
};

const DynamicTableSection = ({
  title,
  description,
  columns,
  data,
  image,
  customClassName,
  blurKeys = [],
}: SectionTableProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleAccordionClick = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div
      className={`bg-white rounded-3xl shadow-md mb-6 overflow-hidden ${customClassName}`}
    >
      <div className='bg-[#D9EBF3] px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center w-full'>
          <img src={image} alt='img' className='mr-6' />
          <div>
            <h2 className='text-[18px] font-bold text-gray-dark-200'>
              {title}
            </h2>
            <p className='text-[12px] text-[#545454]'>{description}</p>
          </div>
          <button className='ml-auto' onClick={handleAccordionClick}>
            {!isShow ? (
              <img src={arrowUpImg} alt='arrow circle' />
            ) : (
              <img src={arrowDownImg} alt='arrow circle' />
            )}
          </button>
        </div>
      </div>

      {!isShow && (
        <div className='p-6'>
          <DynamicTable
            columns={columns}
            data={data}
            customClassName='border-l-0 border-r-0 border-b-0'
            isVertical
            blurKeys={blurKeys}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicTableSection;
