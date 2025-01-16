import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';
import GoogleMap from '../../components/common/GoogleMap';
import DynamicTable from '../../components/common/DynamicTable';
import {
  geoJsonToLatLngArrays,
  geoJsonToPolygon,
} from '../../utils/helper-functions';
import { PLOT_GOOGLE_MAPS_COLUMNS } from '../../constants/table-data';
import { ParcelPolygon, PolygonType } from '../../types/google-maps-types';
import { PlotSearchData } from '../../types/plot-types';
import usePlots from '../../hooks/plot-hook';
import SearchByAttributes from '../../components/search-with-backup/SearchByAttributes';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../../components/common/Loading';

export default function NewPlot() {
  const navigate = useNavigate();
  const { getPlotGeoData, addPlot, getPlotByFilterData } = usePlots();
  const [searchTerm, setSearchTerm] = useState('');
  const [mapPolygons, setMapPolygons] = useState<ParcelPolygon[]>([]);
  const [searchPolygons, setSearchPolygons] = useState<ParcelPolygon[]>([]);
  const [parcelList, setParcelList] = useState<ParcelPolygon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      try {
        const response = await getPlotGeoData();
        const polygons: ParcelPolygon[] = [];
        if (response && response.features && Array.isArray(response.features)) {
          // eslint-disable-next-line
          response.features.forEach((feature: any) => {
            const geometry = feature.geometry;
            const rings = geoJsonToLatLngArrays(geometry);

            const {
              alkis_feature_id,
              state_name,
              municipality_name,
              district_name,
              cadastral_area,
              cadastral_parcel,
            } = feature.properties;

            rings.forEach((ringCoords: PolygonType[]) => {
              polygons.push({
                id: feature.id,
                polygon: ringCoords,
                parcel_id: alkis_feature_id,
                state_name,
                municipality_name,
                district_name,
                cadastral_area,
                cadastral_parcel,
              });
            });
          });
        }

        setMapPolygons(polygons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching parcels:', error);
        setLoading(false);
      }
    };

    fetchParcels();
  }, [getPlotGeoData]);

  const handleParcelClick = (parcel: ParcelPolygon) => {
    // setParcelList((prev) => [...prev, parcel]);
    setParcelList([parcel]);
  };

  const handleSetPolygonData = async (formData: PlotSearchData) => {
    setLoading(true);
    try {
      const filter = Object.fromEntries(
        // eslint-disable-next-line
        Object.entries(formData).filter(([_, value]) => value.trim() !== '')
      );

      const res = await getPlotByFilterData(filter);

      if (!res || !res.length) {
        toast.error('Nema pronađenih flurstücke za zadati upit.');
        return;
      }

      const response = res[0];
      const polygonParsed = JSON.parse(response.polygon);

      const parcel: ParcelPolygon = {
        id: response.id,
        polygon: geoJsonToPolygon(polygonParsed),
        parcel_id: response.alkis_feature_id,
        state_name: response.state_name,
        municipality_name: response.municipality_name,
        district_name: response.district_name,
        cadastral_area: response.cadastral_area,
        cadastral_parcel: response.cadastral_parcel,
      };

      const foundPolygons: ParcelPolygon[] = [parcel];

      setParcelList(foundPolygons);
      setSearchPolygons(foundPolygons);
      setLoading(false);
      toast.success('Flurstücke erfolgreich geladen.');
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Fehler beim Abrufen der Flurstücke.');
    }
  };

  const handleAddPlot = async () => {
    if (!parcelList.length) return;

    const parcel = parcelList[0];
    const id = parcel.id;
    setLoading(true);
    try {
      await addPlot(id);
      setLoading(false);
      toast.success('Flurstück hinzugefügt!');
      navigate('/landowner/my-plots');
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Fehler beim Hinzufügen des Flurstücks.');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearParcelList = () => {
    setParcelList([]);
    setSearchPolygons([]);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div className='flex items-center justify-between mb-6'>
        <div className='w-[526px]'>
          <h1 className='text-[32px] font-bold text-black-muted'>
            Neues Flurstück
          </h1>
          <p className='text-gray-dark-100 text-[16px]'>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>
        <Search
          placeholder='Search address...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='flex-1 flex flex-col'>
        <SearchByAttributes handleSubmit={handleSetPolygonData} />

        {parcelList.length > 0 &&
          parcelList.map((data) => (
            <div
              key={data.id}
              className='w-full bg-white rounded-[18px] p-1 mt-4'
            >
              <DynamicTable data={data} columns={PLOT_GOOGLE_MAPS_COLUMNS} />
            </div>
          ))}

        <div className='flex-1 flex flex-col mt-4'>
          <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
          >
            <GoogleMap
              mapPolygons={mapPolygons}
              searchPolygons={searchPolygons}
              mapSearchTerm={searchTerm}
              onParcelClick={handleParcelClick}
            />
          </div>
        </div>

        <div className='md:col-span-4 flex justify-end space-x-4 mt-4 mb-6'>
          <Button
            variant='blueSecondary'
            type='button'
            onClick={handleClearParcelList}
          >
            Abbrechen
          </Button>
          <Button variant='bluePrimary' type='button' onClick={handleAddPlot}>
            Flurstück hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}
