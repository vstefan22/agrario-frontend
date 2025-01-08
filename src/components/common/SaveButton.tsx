import { FC } from 'react';
import saveIcon from '../../assets/images/save-icon.png';

type SaveButtonProps = {
  onClick?: () => void;
};

const SaveButton: FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='h-[24px] w-[60px] border border-gray text-gray flex items-center justify-center gap-1 rounded-[100px] hover:bg-gray-100 transition-colors mb-1'
    >
      <span className='text-xs'>Save</span>
      <img src={saveIcon} alt='Save' className='h-3 w-3' />
    </button>
  );
};

export default SaveButton;
