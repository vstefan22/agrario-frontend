import { useState, useCallback, useEffect, useRef } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import RangeSlider from '../../components/common/RangeSlider';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import GenericList from '../../components/common/GenericList';
import RegisteredPlotItem from '../../components/developer/my-plots/RegisteredPlotItem';
import useRegisteredPlots from '../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../store/registered-plot-store';
import {
  filterPlotsSearchData,
  sortPlotsSearchData,
  filterPlotSearchDataRange,
} from '../../utils/helper-functions';
import { sortOptions } from '../../constants/select-options';
import filtersImg from '../../assets/images/filters.png';
import { LoadingSpinner } from '../../components/common/Loading';

const RegisteredPlots = () => {
  const { getAllRegisteredPlots } = useRegisteredPlots();
  const { setRegisteredPlots, registeredPlots } = useRegisteredPlotStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [range, setRange] = useState<[number, number]>([2000, 2000000]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [displayedPlots, setDisplayedPlots] = useState(registeredPlots);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  useEffect(() => {
    const fetchRegisteredPlots = async () => {
      setLoading(true);
      const data = await getAllRegisteredPlots();
      setRegisteredPlots(data);
      setLoading(false);
    };
    fetchRegisteredPlots();
  }, [getAllRegisteredPlots, setRegisteredPlots]);

  const toggleFilterOptions = () => {
    setIsOpen((prev) => !prev);
  };

  // const handleSelectChange = (name: string, option: string) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: option,
  //   }));
  // };

  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleRangeFilter = useCallback((newRange: [number, number]) => {
    setRange(newRange);
  }, []);

  const handleApplyFilters = () => {
    const searchFilteredData = filterPlotsSearchData(
      registeredPlots,
      searchTerm
    );
    const rangeFilteredData = filterPlotSearchDataRange(
      searchFilteredData,
      range
    );
    const sortedData = sortPlotsSearchData(
      rangeFilteredData,
      filters.sortOption
    );
    setDisplayedPlots(sortedData);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ sortOption: null });
    setRange([200, 200000]);
    setDisplayedPlots(registeredPlots);
    setIsOpen(false);
  };

  useEffect(() => {
    const applyFilters = () => {
      const searchFilteredData = filterPlotsSearchData(
        registeredPlots,
        searchTerm
      );

      const sortedData = sortPlotsSearchData(
        searchFilteredData,
        filters.sortOption
      );

      setDisplayedPlots(sortedData);
    };

    applyFilters();
  }, [searchTerm, filters, registeredPlots]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Flurstücke suchen
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2'>
        Hier sehen Sie die auf der Plattform eingetragenen Flurstücke. Sie
        können Flurstücke vormerken, indem Sie sie Ihrer Watchlist hinzufügen.
        Erst nach Aktivierung der Anzeige, sind alle Details des Flurstücks
        sichtbar und Sie können ein Gebot abgeben.
      </p>
      <div className='flex justify-between my-8'>
        <div className='flex gap-4'>
          <Search
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='relative'>
            <img
              src={filtersImg}
              alt='Filters Image'
              className='cursor-pointer'
              onClick={toggleFilterOptions}
            />
            {isOpen && (
              <div
                ref={filterRef}
                className='absolute left-1/2 top-full transform -translate-x-1/2 px-4 py-6 rounded-2xl bg-white shadow-xl z-50'
              >
                <h1 className='text-[32px] text-black-muted px-4'>
                  Filtereinstellungen
                </h1>
                <RangeSlider
                  title='Fläche'
                  details='Größe der Fläche'
                  unit='ha'
                  initialValues={[range[0] / 10000, range[1] / 10000]}
                  onFilter={handleRangeFilter}
                  min={0}
                  max={250}
                />
                <p className='text-[18px] text-black-muted my-4'>
                  Nutzung laut ALKIS
                </p>

                <div className='grid grid-cols-2 gap-y-3 gap-x-[4.6rem]'>
                  <Checkbox label='Siedlung' variant='primary' />
                  <Checkbox label='Verkehr' variant='primary' />
                  <Checkbox
                    label='Vegetation: Landwirtschaft'
                    variant='primary'
                  />
                  <Checkbox label='Vegetation: Moor' variant='primary' />
                  <Checkbox label='Vegetation: Wald' variant='primary' />
                  <Checkbox label='Vegetation: Sumpf' variant='primary' />
                  <Checkbox label='Vegetation: Gehölz' variant='primary' />
                  <Checkbox label='Vegetation: Unland' variant='primary' />
                  <Checkbox label='Vegetation: Heide' variant='primary' />
                </div>

                <p className='text-[18px] text-black-muted mb-4 mt-6'>
                  Eignung laut Agrario Vorabanalyse
                </p>

                <div className='grid grid-cols-2 gap-y-3'>
                  <Checkbox label='Freiflächen-PV' variant='primary' />
                  <Checkbox label='Energiespeicher' variant='primary' />
                  <Checkbox label='Windenergie' variant='primary' />
                  <Checkbox
                    label='Ökologische Aufwertungen'
                    variant='primary'
                  />
                </div>

                <div className='space-y-4 mt-8'>
                  <RangeSlider
                    title='Stromnetz'
                    details='Distanz Stromnetz ( Umspannwerk >30kV oder Leitung >60kV)'
                    unit='km'
                    initialValues={[0.2, 30]}
                    onFilter={() => {}}
                    min={0}
                    max={100}
                  />
                  <RangeSlider
                    title='Siedlung'
                    details='Distanz Siedlung'
                    unit='km'
                    initialValues={[0.2, 30]}
                    onFilter={() => {}}
                    min={0}
                    max={100}
                  />
                  <RangeSlider
                    title='Infrastruktur'
                    details='Distanz  Autobahn'
                    unit='km'
                    initialValues={[0.2, 30]}
                    onFilter={() => {}}
                    min={0}
                    max={100}
                  />
                </div>

                <div className='flex gap-4 mt-8'>
                  <Button
                    type='button'
                    variant='blueSecondary'
                    className='max-w-[204px]'
                    onClick={handleResetFilters}
                  >
                    Filter zurücksetzen
                  </Button>
                  <Button
                    type='button'
                    variant='bluePrimary'
                    className='max-w-[204px]'
                    onClick={handleApplyFilters}
                  >
                    Filter anwenden
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Select
          name='sortOption'
          variant='sort'
          options={sortOptions}
          value={filters.sortOption}
          onChange={(name, option) =>
            setFilters((prev) => ({
              ...prev,
              [name]: option,
            }))
          }
          placeholder='Sortieren nach'
        />
      </div>
      {displayedPlots.length > 0 ? (
        <GenericList
          data={displayedPlots}
          renderItem={(plot) => (
            <RegisteredPlotItem key={plot.parcel.id} data={plot} />
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

export default RegisteredPlots;
