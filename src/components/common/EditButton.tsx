import { FC } from 'react';
import pencilIcon from '../../assets/images/pencil.png';
import saveIcon from '../../assets/images/save-icon.png';

type EditButtonProps = {
  onClick?: () => void;
  mode?: string;
};

const EditButton: FC<EditButtonProps> = ({ onClick, mode = 'Edit' }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='h-[24px] w-[60px] border border-gray text-gray flex items-center justify-center gap-1 rounded-[100px] hover:bg-gray-100 transition-colors mb-1'
    >
      <span className='text-xs'>{mode}</span>
      <img
        src={mode === 'Edit' ? pencilIcon : saveIcon}
        alt='Edit'
        className='h-3 w-3'
      />
    </button>
  );
};

export default EditButton;
