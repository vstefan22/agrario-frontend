import { useState, ChangeEvent } from 'react';
import Search from '../../components/common/Search';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
// import GoogleMap, { PolygonData } from '../components/common/GoogleMap';
// import useHttpRequest from '../hooks/http-request-hook';
// import useAuthStore from '../store/auth-store';

type SearchData = {
  municipal: string;
  gemarkung: string;
  flur: string;
  flurstuck: string;
};

export default function NewPlot() {
  // const { token } = useAuthStore();
  // const { sendRequest } = useHttpRequest();
  const [formData, setFormData] = useState<SearchData>({
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
        <h1 className='text-[32px] font-bold text-black-muted'>
          Neues Flurstück
        </h1>
        <Search
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='flex-1 flex flex-col'>
        <div
          className='w-full bg-white rounded-[18px] p-8'
          style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
        >
          <h2 className='text-black text-[40px] leading-[48px] mb-2'>
            Search by Parcel Attributes
          </h2>
          <p className='text-gray-dark-100 text-[20px] leading-[24px] font-normal mb-7'>
            Enter municipal, gemarkung, Flur, and Flurstück
          </p>

          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-4 gap-6'
          >
            <div className='md:col-span-2'>
              <Input
                variant='profile'
                label='Municipal'
                required
                id='municipal'
                name='municipal'
                placeholder='Enter Municipal'
                value={formData.municipal}
                onChange={handleChange}
              />
            </div>
            <div className='md:col-span-2'>
              <Input
                variant='profile'
                label='Gemarkung'
                required
                id='gemarkung'
                name='gemarkung'
                placeholder='Enter Gemarkung'
                value={formData.gemarkung}
                onChange={handleChange}
              />
            </div>
            <div className='md:col-span-2'>
              <Input
                variant='profile'
                label='Flur'
                required
                id='flur'
                name='flur'
                placeholder='Enter Flur'
                value={formData.flur}
                onChange={handleChange}
              />
            </div>
            <div className='md:col-span-2'>
              <Input
                variant='profile'
                label='Flurstück'
                required
                id='flurstuck'
                name='flurstuck'
                placeholder='Enter Flurstück'
                value={formData.flurstuck}
                onChange={handleChange}
              />
            </div>

            <div className='md:col-span-4 flex justify-end space-x-4'>
              <Button
                variant='blueSecondary'
                type='button'
                onClick={() => resetFields()}
              >
                Abbrechen
              </Button>

              <Button variant='bluePrimary' type='submit'>
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className='flex-1 flex flex-col mt-6'>
          <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
          >
            {/* <GoogleMap polygonData={polygonData} /> */}
          </div>
        </div>

        <div className='md:col-span-4 flex justify-end space-x-4 mt-4 mb-6'>
          <Button variant='blueSecondary' type='button' onClick={() => {}}>
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
