import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import Search from '../../components/common/Search';
import Select from '../../components/common/Select';
import RangeSlider from '../../components/common/RangeSlider';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import GenericList from '../../components/common/GenericList';
import RegisteredPlotItem from '../../components/developer/my-plots/RegisteredPlotItem';
import {
  filterPlotsSearchData,
  sortPlotsSearchData,
} from '../../utils/helper-functions';
import { filterPlotSearchDataRange } from '../../utils/helper-functions';
import { sortOptions } from '../../constants/select-options';
import filtersImg from '../../assets/images/filters.png';
import useRegisteredPlots from '../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../store/registered-plot-store';

const RegisteredPlots = () => {
  const { getAllRegisteredPlots } = useRegisteredPlots();
  const { setRegisteredPlots, registeredPlots } = useRegisteredPlotStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [range, setRange] = useState<[number, number]>([200, 200000]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRegisteredPlots = async () => {
      const data = await getAllRegisteredPlots();
      setRegisteredPlots(data);
    };
    fetchRegisteredPlots();
  }, [getAllRegisteredPlots, setRegisteredPlots]);

  const toggleFilterOptions = () => {
    setIsOpen((prev) => !prev);
  };

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

  const searchFilteredData = filterPlotsSearchData(registeredPlots, searchTerm);

  const rangeFilteredData = filterPlotSearchDataRange(
    searchFilteredData,
    range
  );

  const sortedData = sortPlotsSearchData(rangeFilteredData, filters.sortOption);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted'>
        Flurstücke suchen
      </h1>
      <p className='text-gray-dark-100 w-[50%] mt-2'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form.
      </p>
      <div className='flex justify-between my-8'>
        <div className='flex gap-4'>
          <Search
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className='relative'>
            <img
              src={filtersImg}
              alt='Filters Image'
              className='cursor-pointer'
              onClick={toggleFilterOptions}
            />
            {isOpen && (
              <div className='absolute left-1/2 top-full transform -translate-x-1/2 px-4 py-6 rounded-2xl bg-white shadow-xl z-50'>
                <h1 className='text-[32px] text-black-muted px-4'>
                  Filtereinstellungen
                </h1>
                <RangeSlider
                  title='Fläche'
                  details='Größe der Fläche'
                  unit='ha'
                  initialValues={[range[0] / 1000, range[1] / 1000]}
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
                  >
                    Filter zurücksetzen
                  </Button>
                  <Button
                    type='button'
                    variant='bluePrimary'
                    className='max-w-[204px]'
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
          onChange={handleSelectChange}
          placeholder='Sortieren nach'
        />
      </div>
      {sortedData.length > 0 ? (
        <GenericList
          data={sortedData}
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
