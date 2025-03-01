import { useRef, useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { PlotSearchData } from '../../types/plot-types';

type SearchByAttributesProps = {
  handleSubmit: (formData: PlotSearchData) => void;
};

const SearchByAttributes = ({ handleSubmit }: SearchByAttributesProps) => {
  const municipalityNameRef = useRef<HTMLInputElement>(null);
  const districtNameRef = useRef<HTMLInputElement>(null);
  const cadastralAreaRef = useRef<HTMLInputElement>(null);
  const cadastralParcelRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    municipality_name: '',
    communal_district: '',
    cadastral_area: '',
    cadastral_parcel: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      municipality_name: municipalityNameRef.current?.value || '',
      communal_district: districtNameRef.current?.value || '',
      cadastral_area: cadastralAreaRef.current?.value || '',
      cadastral_parcel: cadastralParcelRef.current?.value || '',
    };

    const newErrors = {
      municipality_name: !formData.municipality_name
        ? 'Gemeinde ist erforderlich.'
        : '',
      communal_district: !formData.communal_district
        ? 'Gemarkung ist erforderlich.'
        : '',
      cadastral_area: !formData.cadastral_area ? 'Flur ist erforderlich.' : '',
      cadastral_parcel: !formData.cadastral_parcel
        ? 'Flurstück ist erforderlich.'
        : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      handleSubmit(formData);
    }
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-8 auto-fill-profile'
      style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
    >
      <p className='text-gray-dark-100 text-[20px] leading-[24px] font-normal mb-7'>
        Tragen Sie hier Ihre Daten zum Flurstück ein, um dieses direkt
        auszuwählen.
      </p>

      <form
        onSubmit={onSubmit}
        className='grid grid-cols-1 md:grid-cols-4 gap-6'
      >
        <div className='md:col-span-2'>
          <Input
            variant='profile'
            label='Gemeinde/Stadt'
            required
            id='municipality_name'
            name='municipality_name'
            placeholder='Gemeinde/Stadt'
            ref={municipalityNameRef}
          />
          {errors.municipality_name && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.municipality_name}
            </p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Input
            variant='profile'
            label='Gemarkung'
            required
            id='communal_district'
            name='communal_district'
            placeholder='Gemarkung'
            ref={districtNameRef}
          />
          {errors.communal_district && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.communal_district}
            </p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Input
            variant='profile'
            label='Flur'
            required
            id='cadastral_area'
            name='cadastral_area'
            placeholder='Flur'
            ref={cadastralAreaRef}
          />
          {errors.cadastral_area && (
            <p className='text-red-500 text-sm mt-1'>{errors.cadastral_area}</p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Input
            variant='profile'
            label='Flurstück'
            required
            id='cadastral_parcel'
            name='cadastral_parcel'
            placeholder='Flurstück'
            ref={cadastralParcelRef}
          />
          {errors.cadastral_parcel && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.cadastral_parcel}
            </p>
          )}
        </div>

        <div className='md:col-span-4 flex justify-end space-x-4'>
          <Button variant='bluePrimary' type='submit'>
            Bestätigen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchByAttributes;
