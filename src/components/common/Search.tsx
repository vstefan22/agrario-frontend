import { FC, InputHTMLAttributes } from 'react';
import searchIcon from '../../assets/images/search.png';

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {};

const Search: FC<SearchProps> = ({
  placeholder = 'Search',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        flex items-center
        w-[400px] h-[48px]
        bg-white
        border border-gray-light-150
        rounded-[8px]
        px-3
        ${className}
      `}
      style={{ boxShadow: 'none' }}
    >
      <img src={searchIcon} alt='Search' className='w-4 h-4 mr-2' />
      <input
        type='text'
        placeholder={placeholder}
        {...props}
        className='flex-1 bg-transparent focus:outline-none text-gray-700'
      />
    </div>
  );
};

export default Search;
