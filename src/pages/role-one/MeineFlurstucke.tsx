import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import FlurstuckList from '../../components/maine-flurstucke/FlurstuckList';
import { options } from '../../types/select-options';
import { filterData, sortData } from '../../utils/helper-functions';
import { flurstuckData } from '../../../mockData';

export default function MeineFlurstucke() {
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChange = (option: string) => {
    setSortOption(option);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterData(flurstuckData, searchTerm);
  const sortedData = sortData(filteredData, sortOption);

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
            options={options}
            value={sortOption}
            onChange={handleSelectChange}
            placeholder='Sortieren nach'
          />
        </div>
        <FlurstuckList data={sortedData} />
      </div>
    </div>
  );
}
