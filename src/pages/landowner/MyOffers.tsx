import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import GenericList from '../../components/common/GenericList';
import OfferItem from '../../components/landowner/my-plots/OfferItem';
import { sortOptions } from '../../types/select-options';
import { filterData, sortData } from '../../utils/helper-functions';
import { myOfferData } from '../../../mockData';

function MyOffers() {
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

  const filteredData = filterData(myOfferData, searchTerm);
  const sortedData = sortData(filteredData, filters.sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>Meine Angebote</h1>
      <p className='gray-dark-100 w-[524px]'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>

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
        <GenericList
          data={sortedData}
          renderItem={(plot) => <OfferItem key={plot.id} data={plot} />}
        />
      </div>
    </div>
  );
}

export default MyOffers;
