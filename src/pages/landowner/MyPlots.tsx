import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import GenericList from '../../components/common/GenericList';
import PlotItem from '../../components/landowner/my-plots/PlotItem';
import { sortOptions } from '../../constants/select-options';
import {
  filterData,
  sortData,
  filterDataRange,
} from '../../utils/helper-functions';
import usePlots from '../../hooks/plot-hook';
import usePlotStore from '../../store/plot-store';
import { LoadingSpinner } from '../../components/common/Loading';

export default function MyPlots() {
  const { getMyPlots, deletePlot } = usePlots();
  const { setPlots, plots, removePlotFromList } = usePlotStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [range, setRange] = useState<[number, number]>([200, 200000]);

  useEffect(() => {
    const fetchMyPlots = async () => {
      try {
        setLoading(true);
        const myPlots = await getMyPlots();
        setPlots(myPlots);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error: ', err);
      }
    };
    fetchMyPlots();
  }, [getMyPlots, setPlots]);

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

  const handleOnDelete = async (id: string) => {
    try {
      setLoading(true);
      await deletePlot(Number(id));
      removePlotFromList(id);
      toast.success('Das Flurstück wurde erfolgreich aus der Liste entfernt.');
      setLoading(false);
      // eslint-disable-next-line
    } catch (err: any) {
      setLoading(false);
      toast.error(
        'Es ist ein Fehler aufgetreten, das Flurstück wurde nicht gelöscht.'
      );
    }
  };

  const searchFilteredData = filterData(plots, searchTerm);
  const rangeFilteredData = filterDataRange(searchFilteredData, range);
  const sortedData = sortData(rangeFilteredData, filters.sortOption);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Meine Flurstücke
      </h1>

      <p className='gray-dark-100 w-[60%]'>
        In dieser Ansicht sehen Sie eine Übersicht aller von Ihnen eingetragenen
        Flurstücke. Mit dem Button „Details“ können Sie die Ergebnisse der
        Detailanalyse und Luftbilder des Flurstückes einsehen. Über den Button
        „Anzeige aufgeben“ haben Sie die Möglichkeit, ihr Flurstück zu
        inserieren und unverbindlich Pacht- oder Kaufangebote zu erhalten.
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
            addRangeSlider
            title='Fläche'
            details='Größe der Fläche'
            onFilter={handleRangeFilter}
            unit='ha'
            initialValues={[range[0] / 1000, range[1] / 1000]}
          />
        </div>

        {sortedData.length > 0 ? (
          <GenericList
            data={sortedData}
            renderItem={(plot) => (
              <PlotItem key={plot.id} data={plot} onDelete={handleOnDelete} />
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
}
