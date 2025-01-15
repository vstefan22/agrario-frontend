import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Search from "../../components/common/Search";
import Button from "../../components/common/Button";
import GoogleMap from "../../components/common/GoogleMap";

import DynamicTable from "../../components/common/DynamicTable";
import { geoJsonToLatLngArrays } from "../../utils/helper-functions";
import { PLOT_GOOGLE_MAPS_COLUMNS } from "../../constants/table-data";
import { ParcelPolygon, ParcelPolygonArray, PolygonType } from "../../types/google-maps-types";
import { PlotSearchData } from "../../types/plot-types";
import usePlots from "../../hooks/plot-hook";
import SearchByAttributes from "../../components/search-with-backup/SearchByAttributes";
import { toast } from "react-toastify";

export default function NewPlot() {
  const { getPlotGeoData, addPlot, getAllPlots } = usePlots();
  const [formData, setFormData] = useState<PlotSearchData>({
    state_name: "",
    zipcode: "",
    municipality_name: "",
    district_name: "",
    cadastral_area: "",
    cadastral_parcel: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [parcelList, setParcelList] = useState<ParcelPolygon[]>([]);
  const [mapPolygons, setMapPolygons] = useState<ParcelPolygonArray>([]);
  // const [selectedParcel, setSelectedParcel] = useState<ParcelPolygon | null>(
  //   null
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await getPlotGeoData();
        const polygons: ParcelPolygonArray = [];
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
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };

    fetchParcels();
  }, [getPlotGeoData]);

  const handleParcelClick = (parcel: ParcelPolygon) => {
    // setParcelList((prev) => [...prev, parcel]);
    setParcelList([parcel]);
  };

  const handleSetPolygonData = async (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT?");

    try {
      const response = await getAllPlots(formData);
      const polygons: ParcelPolygonArray = [];

      console.log(polygons);

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

          rings.forEach((ringCoords) => {
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
      toast.success("Flurstücke erfolgreich geladen.");
    } catch (err) {
      console.error(err);
      toast.error("Fehler beim Abrufen der Flurstücke.");
    }
  };

  const handleAddPlot = async () => {
    if (!parcelList.length) return;

    const parcel = parcelList[0];
    const id = parcel.id;

    try {
      await addPlot(id);
      toast.success("Flurstück hinzugefügt!");
    } catch (err) {
      console.error(err);
      toast.error("Fehler beim Hinzufügen des Flurstücks.");
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFields = () => {
    setFormData({
      state_name: "",
      zipcode: "",
      municipality_name: "",
      district_name: "",
      cadastral_area: "",
      cadastral_parcel: "",
    });
    setParcelList([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-7 pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="w-[526px]">
          <h1 className="text-[32px] font-bold text-black-muted">Neues Flurstück</h1>
          <p className="text-gray-dark-100 text-[16px]">
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form.
          </p>
        </div>
        <Search placeholder="Search address..." value={searchTerm} onChange={handleSearchChange} />
      </div>

      <div className="flex-1 flex flex-col">
        <SearchByAttributes
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSetPolygonData}
          resetFields={resetFields}
        />

        {parcelList.length > 0 &&
          parcelList.map((data) => (
            <div className="w-full bg-white rounded-[18px] p-1 mt-4">
              <DynamicTable data={data} columns={PLOT_GOOGLE_MAPS_COLUMNS} />
            </div>
          ))}

        <div className="flex-1 flex flex-col mt-4">
          <div
            className="w-full bg-white rounded-[18px] p-8"
            style={{ boxShadow: "6px 6px 54px 0px #0000000D" }}
          >
            <GoogleMap
              polygonsData={mapPolygons}
              mapSearchTerm={searchTerm}
              onParcelClick={handleParcelClick}
            />
          </div>
        </div>

        <div className="md:col-span-4 flex justify-end space-x-4 mt-4 mb-6">
          <Button variant="blueSecondary" type="button" onClick={() => {}}>
            Abbrechen
          </Button>
          <Button variant="bluePrimary" type="button" onClick={handleAddPlot}>
            Flurstück hinzufügen
          </Button>
        </div>
      </div>
    </div>
  );
}
