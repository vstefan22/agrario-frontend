import { useState, useEffect, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import GenericList from '../../components/common/GenericList';
import ActiveAuctionsItem from '../../components/developer/my-plots/ActiveAuctionsItem';
import { sortOptions } from '../../constants/select-options';
import {
  filterActiveAuctionsData,
  sortActiveAuctionsData,
} from '../../utils/helper-functions';
import useAuctionOffers from '../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../store/auctions-store';
import { LoadingSpinner } from '../../components/common/Loading';

const ActiveAuctions = () => {
  const { getAuctionOffers } = useAuctionOffers();
  const { setAuctionOffers, auctionOffers } = useAuctionOfferstore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyActiveAuctions = async () => {
      setLoading(true);
      const data = await getAuctionOffers();
      setAuctionOffers(data.offers);
      setLoading(false);
    };
    fetchMyActiveAuctions();
  }, [getAuctionOffers, setAuctionOffers]);

  const handleSelectChange = (name: string, option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterActiveAuctionsData(auctionOffers, searchTerm);
  const sortedData = sortActiveAuctionsData(filteredData, filters.sortOption);

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Altive Anzeigen
      </h1>
      <p className='gray-dark-100 w-[860px]'>
        Hier finden Sie veröffentlichte und aktive Anzeigen. Sehen Sie sich die
        Details an und bekunden Sie Ihr Interesse an einer Teilnahme am
        Bieterverfahren. Hinweis: Gemäß den AGB ist es untersagt,
        Grundstückseigentümer zu den veröffentlichten Flurstücken eigenständig
        zu kontaktieren. Eine Kontaktaufnahme ist ausschließlich mit
        schriftlicher Genehmigung von Agrario Anergy gestattet.
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
            renderItem={(auctionOffer) => (
              <ActiveAuctionsItem
                key={auctionOffer.identifier}
                data={auctionOffer}
                detailsType='auction'
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

export default ActiveAuctions;
