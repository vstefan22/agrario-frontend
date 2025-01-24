import { FC, useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import searchIcon from "../../assets/images/search.png";

type SearchGoogleMapsProps = {
  placeholder?: string;
  className?: string;
  onPlaceSelected: (latLng: google.maps.LatLng) => void;
};

const SearchGoogleMaps: FC<SearchGoogleMapsProps> = ({
  placeholder = "Search",
  className = "",
  onPlaceSelected,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reference for AutocompleteService
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);

  const handleOnLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
  };

  const handleOnPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place.geometry?.location) {
      onPlaceSelected(place.geometry.location);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (autocompleteServiceRef.current && inputValue.trim() !== "") {
        // Fetch predictions using the AutocompleteService
        autocompleteServiceRef.current.getPlacePredictions(
          { input: inputValue, types: ["(regions)"], componentRestrictions: { country: "de" } },
          (predictions, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              predictions &&
              predictions.length > 0
            ) {
              // Select the first suggestion
              const firstPrediction = predictions[0];
              const placesService = new google.maps.places.PlacesService(
                document.createElement("div")
              );
              placesService.getDetails(
                { placeId: firstPrediction.place_id },
                (placeDetails, placeStatus) => {
                  if (
                    placeStatus === google.maps.places.PlacesServiceStatus.OK &&
                    placeDetails?.geometry?.location
                  ) {
                    onPlaceSelected(placeDetails.geometry.location);
                  }
                }
              );
            }
          }
        );
      }
    }
  };

  return (
    <div
      className={`flex items-center w-[400px] h-[48px] bg-white border border-gray-light-150 rounded-[8px] px-3 ${className}`}
      style={{ boxShadow: "none" }}
    >
      <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />

      <Autocomplete
        onLoad={handleOnLoad}
        onPlaceChanged={handleOnPlaceChanged}
        options={{
          types: ["(regions)"],
          componentRestrictions: { country: "de" },
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent focus:outline-none text-gray-700"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Autocomplete>
    </div>
  );
};

export default SearchGoogleMaps;
