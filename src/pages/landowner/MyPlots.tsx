import { useState, ChangeEvent, useCallback } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import PlotList from '../../components/my-plots/PlotList';
import { sortOptions } from '../../types/select-options';
import {
  filterData,
  sortData,
  filterDataRange,
} from '../../utils/helper-functions';
import { plotsListData } from '../../../mockData';

export default function MyPlots() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [range, setRange] = useState<[number, number]>([20, 20000]);

  const handleSelectChange = (name: string, option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRangeFilter = useCallback((newRange: [number, number]) => {
    setRange(newRange);
  }, []);

  const searchFilteredData = filterData(plotsListData, searchTerm);
  const rangeFilteredData = filterDataRange(searchFilteredData, range);
  const sortedData = sortData(rangeFilteredData, filters.sortOption);

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
            addRangeSlider
            title='Fläche'
            details='Größe der Fläche'
            onFilter={handleRangeFilter}
            unit='ha'
            initialValues={[range[0] / 100, range[1] / 100]}
          />
        </div>
        <PlotList data={sortedData} />
      </div>
    </div>
  );
}
