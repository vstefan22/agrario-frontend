import { useEffect, useState, ChangeEvent, useCallback } from "react";
import Search from "../../components/common/Search";
import Select from "../../components/common/Select";
import GenericList from "../../components/common/GenericList";
import PlotItem from "../../components/landowner/my-plots/PlotItem";
import { sortOptions } from "../../constants/select-options";
import { filterData, sortData, filterDataRange } from "../../utils/helper-functions";
import usePlots from "../../hooks/plot-hook";
import usePlotStore from "../../store/plot-store";
// TODO:  remove mock and use actual data
import { plotsListData } from "../../../mockData";

export default function MyPlots() {
  const { getMyPlots } = usePlots();
  const { setPlots, plots } = usePlotStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string | null>>({
    sortOption: null,
  });
  const [range, setRange] = useState<[number, number]>([20, 20000]);

  useEffect(() => {
    const fetchMyPlots = async () => {
      try {
        const myPlots = await getMyPlots();
        setPlots(myPlots);
      } catch (err) {
        console.error("Failed to fetch my plots:", err);
      }
    };
    fetchMyPlots();
  }, [getMyPlots, setPlots]);

  console.log(plots);
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

  const searchFilteredData = filterData(plots, searchTerm);
  const rangeFilteredData = filterDataRange(searchFilteredData, range);
  const sortedData = sortData(rangeFilteredData, filters.sortOption);
  // TODO: mock data is currently used for testing purposes
  // remove this console log and use sortedData instead of mock data
  console.log(sortedData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-7 pt-4">
      <h1 className="text-[32px] font-bold text-black-muted">Meine Flurstücke</h1>

      <div className="flex mt-6 flex-col gap-6">
        <div className="flex justify-between items-center">
          <Search placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
          <Select
            name="sortOption"
            variant="sort"
            options={sortOptions}
            value={filters.sortOption}
            onChange={handleSelectChange}
            placeholder="Sortieren nach"
            addRangeSlider
            title="Fläche"
            details="Größe der Fläche"
            onFilter={handleRangeFilter}
            unit="ha"
            initialValues={[range[0] / 100, range[1] / 100]}
          />
        </div>

        {plotsListData.length > 0 ? (
          <GenericList data={plots} renderItem={(plot) => <PlotItem key={plot.id} data={plot} />} />
        ) : (
          <div className="flex text-[18px] font-500 gray-light-200 justify-center">
            Derzeit gibt es keine Daten in der Liste.
          </div>
        )}
      </div>
    </div>
  );
}
