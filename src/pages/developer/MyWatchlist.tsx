import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import MyWatchlistList from '../../components/developer/my-plots/MyWatchlistList';
import { sortOptions } from '../../types/select-options';
import {
  sortPlotsSearchData,
  filterPlotsSearchData,
} from '../../utils/helper-functions';
import { myWatchlistData } from '../../../mockData';

const MyWatchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });

  const handleSelectChange = (name: string, option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterPlotsSearchData(myWatchlistData, searchTerm);
  const sortedData = sortPlotsSearchData(filteredData, filters.sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Watchlist
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
      <div className='flex justify-between my-8'>
        <div className='flex gap-4'>
          <Search
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Select
          name='sortOption'
          variant='sort'
          options={sortOptions}
          value={filters.sortOption}
          onChange={handleSelectChange}
          placeholder='Sortieren nach'
        />
      </div>
      <MyWatchlistList data={sortedData} />
    </div>
  );
};

export default MyWatchlist;
