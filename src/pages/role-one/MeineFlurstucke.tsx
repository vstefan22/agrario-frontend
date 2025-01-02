import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import FlurstuckList from '../../components/maine-flurstucke/FlurstuckList';
import { filterData, sortData } from '../../utils/helper-functions';
import { sortOptions } from '../../types/select-options';
import { flurstuckListData } from '../../../mockData';

export default function MeineFlurstucke() {
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

  const filteredData = filterData(flurstuckListData, searchTerm);
  const sortedData = sortData(filteredData, filters.sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Flurstück
      </h1>

      <div className='flex mt-6 flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Search
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Select
            name='sortOption'
            variant='sort'
            options={sortOptions}
            value={filters.sortOption}
            onChange={handleSelectChange}
            placeholder='Sortieren nach'
          />
        </div>
        <FlurstuckList data={sortedData} />
      </div>
    </div>
  );
}