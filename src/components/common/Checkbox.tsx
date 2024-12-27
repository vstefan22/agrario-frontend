import { FC } from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className='flex items-center space-x-2 cursor-pointer'>
      <input
        type='checkbox'
        {...props}
        className='h-[14px] w-[14px] border border-white rounded-sm appearance-none checked:bg-white checked:border-transparent focus:outline-none'
      />
      <span className='text-white text-sm'>{label}</span>
    </label>
  );
};

export default Checkbox;
