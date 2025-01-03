import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Button from '../../components/common/Button';
// import GoogleMap, { PolygonData } from '../components/common/GoogleMap';
// import useHttpRequest from '../hooks/http-request-hook';
// import useAuthStore from '../store/auth-store';
import SearchByAttributesUpdated from '../../components/my-plots/SearchByAttributesUpdated';

type SearchData = {
  federalState: string;
  zipCode: string;
  municipal: string;
  gemarkung: string;
  flur: string;
  flurstuck: string;
};

export default function NewPlot() {
  // const { token } = useAuthStore();
  // const { sendRequest } = useHttpRequest();
  const [formData, setFormData] = useState<SearchData>({
    federalState: '',
    zipCode: '',
    municipal: '',
    gemarkung: '',
    flur: '',
    flurstuck: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // const [polygonData, setPolygonData] = useState<PolygonData>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.federalState ||
      !formData.zipCode ||
      !formData.municipal ||
      !formData.gemarkung ||
      !formData.flur ||
      !formData.flurstuck
    ) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // const data = await sendRequest(
      //   '/furstuck/',
      //   'POST',
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      //   formData
      // );

      // const dummyCoords: PolygonData = [
      //   { lat: 52.52, lng: 13.4 },
      //   { lat: 52.52, lng: 13.41 },
      //   { lat: 52.53, lng: 13.41 },
      //   { lat: 52.53, lng: 13.4 },
      // ];

      // setPolygonData(dummyCoords);
      setSuccess('Parcela je uspešno pronađena!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  };

  const handleOnAddFlurstuck = () => {
    console.log('Add flurstuck clicked.');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFields = () => {
    setFormData({
      federalState: '',
      zipCode: '',
      municipal: '',
      gemarkung: '',
      flur: '',
      flurstuck: '',
    });
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
          <p className='text-gray-dark-100 text-[16px]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
        </div>
        <Search
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='flex-1 flex flex-col'>
        {/* Stari SearchByAttributes se nalazi u my-plots/SearchByAttributes.tsx */}
        <SearchByAttributesUpdated
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          resetFields={resetFields}
        />

        <div className='flex-1 flex flex-col mt-6'>
          <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
          >
            {/* <GoogleMap polygonData={polygonData} /> */}
          </div>
        </div>

        <div className='md:col-span-4 flex justify-end space-x-4 mt-4 mb-6'>
          <Button variant='blueSecondary' type='button' onClick={() => { }}>
            Abbrechen
          </Button>

          <Button
            variant='bluePrimary'
            type='button'
            onClick={handleOnAddFlurstuck}
          >
            Flurstück hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}
