import { FC, ChangeEvent } from 'react';
import searchIcon from '../../assets/images/search.png';

type SearchProps = {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: FC<SearchProps> = ({
  placeholder = 'Search',
  className = '',
  value,
  onChange,
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
        value={value}
        onChange={onChange}
        className='flex-1 bg-transparent focus:outline-none text-gray-700'
      />
    </div>
  );
};

export default Search;
