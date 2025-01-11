import { useState, ChangeEvent, FormEvent } from 'react';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';
import GoogleMap from '../../components/common/GoogleMap';
import SearchByAttributesUpdated from '../../components/search-with-backup/SearchByAttributesUpdated';
import DynamicTable from '../../components/common/DynamicTable';
// import useAuthStore from '../../store/auth-store';
// import useHttpRequest from '../../hooks/http-request-hook';
import { GoogleMapDataType } from '../../types/google-maps-types';
import { PlotSearchData } from '../../types/plot-types';
import { PLOT_GOOGLE_MAPS_COLUMNS } from '../../constants/table-data';

// type PlotSearchResult = {
//   id: string;
//   state_name: string;
//   zipcode: string;
//   municipality_name: string;
//   district_name: string;
//   cadastral_area: string;
//   cadastral_sector: string;
//   polygonCoords: PolygonData;
// };

export default function NewPlot() {
  // const { token } = useAuthStore();
  // const { sendRequest } = useHttpRequest();
  const [formData, setFormData] = useState<PlotSearchData>({
    state_name: '',
    zipcode: '',
    municipality_name: '',
    district_name: '',
    cadastral_area: '',
    cadastral_sector: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [googleMapData, setGoogleMapData] = useState<GoogleMapDataType>();
  const [googleMapDataList, setGoogleMapDataList] = useState<
    GoogleMapDataType[]
  >([]);
  // const [searchResults, setSearchResults] = useState<PlotSearchResult[] | null>(
  //   null
  // );

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
    // setSearchResults(null);

    try {
      // TODO: make an actual request to get polygon data
      // const data = await sendRequest(
      //   '/use-actual-endpoint/',
      //   'POST',
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   },
      //   formData
      // );
      //
      // setGoogleMapData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  };

  const handleAddPlot = () => {
    console.log('Final payload:', googleMapDataList);

    // sendRequest(
    //   '/offers/plots/',
    //   'POST',
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   },
    //   googleMapDataList
    // );

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
    // setSearchResults(null);
    setGoogleMapDataList([]);
  };

  const handleMapClick = (googleMapData: GoogleMapDataType) => {
    setGoogleMapData(googleMapData);
    setGoogleMapDataList((prev) => [...prev, googleMapData]);
  };

  console.log('googleMapData: ', googleMapData);

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

        {googleMapDataList.length > 0 &&
          googleMapDataList.map((data) => (
            <div className='w-full bg-white rounded-[18px] p-1 mt-4'>
              <DynamicTable data={data} columns={PLOT_GOOGLE_MAPS_COLUMNS} />
            </div>
          ))}

        <div className='flex-1 flex flex-col mt-4'>
          <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
          >
            <GoogleMap
              polygonData={googleMapData?.polygon.coordinates}
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
