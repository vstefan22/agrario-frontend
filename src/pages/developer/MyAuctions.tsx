import { useState, useEffect, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import GenericList from '../../components/common/GenericList';
import ActiveAuctionsItem from '../../components/developer/my-plots/ActiveAuctionsItem';
import useAuctionOffers from '../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../store/auctions-store';
import { sortOptions } from '../../constants/select-options';
import {
  filterActiveAuctionsData,
  sortActiveAuctionsData,
} from '../../utils/helper-functions';

const MyAuctions = () => {
  const { getMyAuctionOffers } = useAuctionOffers();
  const { setMyAuctionOffers, myAuctionOffers } = useAuctionOfferstore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });

  useEffect(() => {
    const fetchMyWatchlist = async () => {
      const data = await getMyAuctionOffers();
      console.log('DATA FROM MY AUCTIONS: ', data);
      setMyAuctionOffers(data.offers);
    };
    fetchMyWatchlist();
  }, [getMyAuctionOffers, setMyAuctionOffers]);

  const handleSelectChange = (name: string, option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterActiveAuctionsData(myAuctionOffers, searchTerm);
  const sortedData = sortActiveAuctionsData(filteredData, filters.sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Auktionen
      </h1>
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

        {sortedData.length > 0 ? (
          <GenericList
            data={sortedData}
            renderItem={(offer) => (
              <ActiveAuctionsItem
                key={offer.identifier}
                data={offer}
                detailsType='myAuction'
              />
            )}
          />
        ) : (
          <div className='flex text-[18px] font-500 gray-light-200 justify-center'>
            Derzeit gibt es keine Daten in der Liste.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAuctions;
