import { QuestionsHelpItem } from '../../types/questions-help-types';
import plusIcon from '../../assets/images/plus.png';
import minusIcon from '../../assets/images/minus.png';

type AccordionProps = {
  item: QuestionsHelpItem;
  opened: boolean[];
  index: number;
  toggleButton: (index: number) => void;
};

function Accordion({ item, opened, index, toggleButton }: AccordionProps) {
  return (
    <div className='mt-2 mb-4'>
      <div
        onClick={() => toggleButton(index)}
        className={`relative w-full flex flex-col px-8 py-[1.2rem] font-medium rounded-[16px] border-[1.5px]
            border-gray-medium/60 transition-all duration-[300ms] cursor-pointer select-none ${
              opened[index]
                ? 'bg-white text-gray-dark-100'
                : 'bg-primary-blue text-white border-primary-blue'
            }`}
      >
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-lg font-semibold'>{item.title}</h1>

          <img
            src={opened[index] ? minusIcon : plusIcon}
            alt='image'
            className='w-6 h-6'
          />
        </div>

        {opened[index] && (
          <p className='text-sm mt-4 text-gray-dark-100 w-2/3'>
            {item.content}
          </p>
        )}
      </div>
    </div>
  );
}

export default Accordion;
