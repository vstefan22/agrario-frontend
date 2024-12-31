import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import { options } from '../../types/select-options';
import { filterData, sortData } from '../../utils/helper-functions';
import { myOfferData } from '../../../mockData';
import MyOfferList from '../../components/maine-flurstucke/MyOffersList';
import { useState, ChangeEvent } from 'react';


function MyOffers() {
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChange = (option: string) => {
    setSortOption(option);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterData(myOfferData, searchTerm);
  const sortedData = sortData(filteredData, sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Angebote
      </h1>
      <p className="gray-dark-100 w-[524px]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>


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
        <MyOfferList data={sortedData} />
      </div>
    </div>
  );
}

export default MyOffers;
