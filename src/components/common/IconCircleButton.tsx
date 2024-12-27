import { FC, ReactNode } from 'react';

type IconCircleButtonProps = {
  onClick?: () => void;
  icon: ReactNode;
  ariaLabel: string;
  className?: string;
};

const IconCircleButton: FC<IconCircleButtonProps> = ({
  onClick,
  icon,
  ariaLabel,
  className = '',
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`bg-primary text-white rounded-full p-2 hover:bg-primary-hover2 transition-colors shadow-lg ${className}`}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconCircleButton;
