import { useState, ChangeEvent, FormEvent } from 'react';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';
import GoogleMap from '../../components/common/GoogleMap';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import SearchByAttributesUpdated from '../../components/search-with-backup/SearchByAttributesUpdated';
import {
  PolygonData,
  PolygonType,
  LocationType,
} from '../../types/google-maps-types';
import { PlotSearchData } from '../../types/plot-types';

interface PlotSearchResult {
  id: string;
  state_name: string;
  zipcode: string;
  municipality_name: string;
  district_name: string;
  cadastral_area: string;
  cadastral_sector: string;
  polygonCoords: PolygonData;
}

export default function NewPlot() {
  const { token } = useAuthStore();
  const { sendRequest } = useHttpRequest();
  const [formData, setFormData] = useState<PlotSearchData>({
    state_name: '',
    zipcode: '',
    municipality_name: '',
    district_name: '',
    cadastral_area: '',
    cadastral_sector: '',
    // plot_number_main: 0
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [polygonData, setPolygonData] = useState<PolygonData>([]);
  const [searchResults, setSearchResults] = useState<PlotSearchResult[] | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetPolygonData = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.state_name ||
      !formData.zipcode ||
      !formData.municipality_name ||
      !formData.district_name ||
      !formData.cadastral_area ||
      !formData.cadastral_sector
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setSearchResults(null);

    try {
      // TODO: make an actual request to get polygon data
      // const data: PlotSearchResult[] = await sendRequest(
      //   '/your-backend-endpoint/',
      //   'POST',
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   },
      //   formData
      // );
      //
      // // data.length > 1 => prikaži tablicu
      // // data.length = 1 => postavi poligon i prikaži
      //

      const dummyData: PlotSearchResult[] = [
        {
          id: 'plot1',
          state_name: 'Brandenburg',
          zipcode: '15518',
          municipality_name: 'Steinhöfel',
          district_name: 'Heinersdorf',
          cadastral_area: 'Flur 112',
          cadastral_sector: 'Flurstück 123/4',
          polygonCoords: [
            { lat: 52.52, lng: 13.4 },
            { lat: 52.52, lng: 13.41 },
            { lat: 52.53, lng: 13.41 },
            { lat: 52.53, lng: 13.4 },
          ],
        },
        {
          id: 'plot2',
          state_name: 'Brandenburg',
          zipcode: '15518',
          municipality_name: 'Steinhöfel',
          district_name: 'Tempelberger Weg',
          cadastral_area: 'Flur 220',
          cadastral_sector: 'Flurstück 999/2',
          polygonCoords: [
            { lat: 52.525, lng: 13.43 },
            { lat: 52.525, lng: 13.435 },
            { lat: 52.53, lng: 13.435 },
            { lat: 52.53, lng: 13.43 },
          ],
        },
      ];

      if (dummyData.length === 1) {
        const single = dummyData[0];
        setPolygonData(single.polygonCoords);
        setSuccess(
          `Gefunden: ${single.district_name} / ${single.cadastral_area}`
        );
      } else if (dummyData.length > 1) {
        setSearchResults(dummyData);
        setSuccess(`Gefunden: ${dummyData.length} Ergebnisse`);
        setPolygonData([]);
      } else {
        setError('Keine Ergebnisse gefunden.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  };

  const handleSelectPlotFromTable = (plot: PlotSearchResult) => {
    setPolygonData(plot.polygonCoords);
    setSearchResults(null);
    setSuccess(`Parzelle "${plot.id}" ausgewählt.`);
  };

  const handleAddPlot = () => {
    const finalPayload = {
      state_name: formData.state_name,
      district_name: formData.district_name,
      municipality_name: formData.municipality_name,
      cadastral_area: formData.cadastral_area,
      cadastral_sector: formData.cadastral_sector,
      zipcode: formData.zipcode,
      plot_number_main: 10000,
      plot_number_secondary: '5678',
      land_use: 'Residential',
      polygon: {
        type: 'Polygon',
        coordinates: [polygonData.map((coord) => [coord.lng, coord.lat])],
      },
      status: 'available',
    };

    console.log('Final payload:', finalPayload);

    sendRequest(
      '/offers/plots/',
      'POST',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      finalPayload
    );

    setSuccess('Flurstück hinzugefügt!');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFields = () => {
    setFormData({
      state_name: '',
      zipcode: '',
      municipality_name: '',
      district_name: '',
      cadastral_area: '',
      cadastral_sector: '',
    });
    setSearchResults(null);
    setPolygonData([]);
  };

  const handleMapClick = (polygon: PolygonType, locationData: LocationType) => {
    setPolygonData([polygon]);
    console.log('location data: ', locationData);
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      {error && <div className='text-red-600 mb-6'>{error}</div>}
      {success && <div className='text-green-600 mb-6'>{success}</div>}

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
        <SearchByAttributesUpdated
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSetPolygonData}
          resetFields={resetFields}
        />

        {searchResults && searchResults.length > 1 && (
          <div className='mt-6 bg-white border border-gray-300 rounded p-4'>
            <h2 className='text-lg font-semibold mb-2'>
              {searchResults.length} Ergebnisse
            </h2>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100 text-left'>
                  <th className='p-2 border'>Bundesland</th>
                  <th className='p-2 border'>Gemeinde</th>
                  <th className='p-2 border'>PLZ</th>
                  <th className='p-2 border'>Gemarkung</th>
                  <th className='p-2 border'>Flur</th>
                  <th className='p-2 border'>Flurstück</th>
                  <th className='p-2 border'>Aktion</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((plot) => (
                  <tr key={plot.id}>
                    <td className='p-2 border'>{plot.state_name}</td>
                    <td className='p-2 border'>{plot.municipality_name}</td>
                    <td className='p-2 border'>{plot.zipcode}</td>
                    <td className='p-2 border'>{plot.district_name}</td>
                    <td className='p-2 border'>{plot.cadastral_area}</td>
                    <td className='p-2 border'>{plot.cadastral_sector}</td>
                    <td className='p-2 border'>
                      <Button
                        variant='blueSecondary'
                        type='button'
                        onClick={() => handleSelectPlotFromTable(plot)}
                      >
                        Anzeigen
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className='flex-1 flex flex-col mt-6'>
          <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
          >
            <GoogleMap
              polygonData={polygonData}
              onMapClick={handleMapClick}
              mapSearchTerm={searchTerm}
            />
          </div>
        </div>

        <div className='md:col-span-4 flex justify-end space-x-4 mt-4 mb-6'>
          <Button variant='blueSecondary' type='button' onClick={() => {}}>
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
