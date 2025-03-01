import { useState, useEffect, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import GenericList from '../../components/common/GenericList';
import { sortOptions } from '../../constants/select-options';
import {
  sortPlotsSearchData,
  filterPlotsSearchData,
} from '../../utils/helper-functions';
import MyWatchlistItem from '../../components/developer/my-plots/MyWatchlistItem';
import useRegisteredPlotStore from '../../store/registered-plot-store';
import useRegisteredPlots from '../../hooks/registered-plot-hook';
import { LoadingSpinner } from '../../components/common/Loading';

const MyWatchlist = () => {
  const { getMyWatchlist } = useRegisteredPlots();
  const { setMyRegisteredPlots, myRegisteredPlots } = useRegisteredPlotStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyWatchlist = async () => {
      setLoading(true);
      const data = await getMyWatchlist();
      setMyRegisteredPlots(data);
      setLoading(false);
    };
    fetchMyWatchlist();
  }, [getMyWatchlist, setMyRegisteredPlots]);

  const handleSelectChange = (name: string, option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: option,
    }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterPlotsSearchData(myRegisteredPlots, searchTerm);
  const sortedData = sortPlotsSearchData(filteredData, filters.sortOption);

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Watchlist
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2'>
        Hier finden Sie die Flurstücke auf Ihrer Watchlist. Sie werden
        benachrichtigt, sobald eine Anzeige mit diesem Flurstück aktiviert wird.
        Bis dahin bleiben einige Details verborgen.
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
      {sortedData.length > 0 ? (
        <GenericList
          data={sortedData}
          renderItem={(plot) => (
            <MyWatchlistItem key={plot.parcel.id} data={plot} />
          )}
        />
      ) : (
        <div className='flex text-[18px] font-500 gray-light-200 justify-center'>
          Derzeit gibt es keine Daten in der Liste.
        </div>
      )}
    </div>
  );
};

export default MyWatchlist;
