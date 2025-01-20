import { FC, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import searchIcon from '../../assets/images/search.png';

type SearchGoogleMapsProps = {
  placeholder?: string;
  className?: string;
  onPlaceSelected: (latLng: google.maps.LatLng) => void;
};

const SearchGoogleMaps: FC<SearchGoogleMapsProps> = ({
  placeholder = 'Search',
  className = '',
  onPlaceSelected,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const handleOnLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleOnPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place.geometry?.location) {
      onPlaceSelected(place.geometry.location);
    }
  };

  return (
    <div
      className={`flex items-center w-[400px] h-[48px] bg-white border border-gray-light-150 rounded-[8px] px-3 ${className}`}
      style={{ boxShadow: 'none' }}
    >
      <img src={searchIcon} alt='Search' className='w-4 h-4 mr-2' />

      <Autocomplete
        onLoad={handleOnLoad}
        onPlaceChanged={handleOnPlaceChanged}
        options={{
          types: ['(regions)'],
          componentRestrictions: { country: 'de' },
        }}
      >
        <input
          type='text'
          placeholder={placeholder}
          className='flex-1 bg-transparent focus:outline-none text-gray-700'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Autocomplete>
    </div>
  );
};

export default SearchGoogleMaps;
