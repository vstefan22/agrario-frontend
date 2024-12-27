import { FC } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'sidebarPrimary'
  | 'sidebarSecondary'
  | 'bluePrimary'
  | 'blueSecondary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  isLoading,
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'rounded-md transition-colors flex items-center text-center';

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'justify-center w-[236px] h-[48px] bg-white text-primary border border-transparent hover:bg-gray-muted';
      break;
    case 'secondary':
      variantClasses =
        'justify-center w-[236px] h-[48px] bg-[rgba(255,255,255,0.10)] text-white border border-white hover:bg-[rgba(255,255,255,0.15)]';
      break;
    case 'sidebarPrimary':
      variantClasses =
        'justify-start w-[215px] bg-primary text-white rounded-[11px] py-4 px-2 hover:bg-primary-hover transition-colors text-[15px] font-semibold';
      break;
    case 'sidebarSecondary':
      variantClasses =
        'justify-start w-[215px] bg-white text-gray-medium rounded-[11px] py-4 px-2 hover:bg-gray-100 transition-colors text-[15px] font-semibold';
      break;
    case 'bluePrimary':
      variantClasses =
        'justify-center w-[236px] h-[48px] bg-primary-blue text-white border border-transparent hover:bg-primary-blue-hover';
      break;
    case 'blueSecondary':
      variantClasses =
        'justify-center w-[236px] h-[48px] bg-white text-primary-blue border border-primary-blue hover:bg-gray-light-100';
      break;
  }

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
