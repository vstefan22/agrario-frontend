import Input from "../common/Input";
import Button from "../common/Button";
import { PlotSearchData } from "../../types/plot-types";

type SearchByAttributesProps = {
  formData: PlotSearchData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetFields: () => void;
};

const SearchByAttributesUpdated = ({
  formData,
  handleChange,
  handleSubmit,
  resetFields,
}: SearchByAttributesProps) => {
  return (
    <div
      className="w-full bg-white rounded-[18px] p-8"
      style={{ boxShadow: "6px 6px 54px 0px #0000000D" }}
    >
      <h2 className="text-black text-[40px] leading-[48px] mb-2">Search by Parcel Attributes</h2>
      <p className="text-gray-dark-100 text-[20px] leading-[24px] font-normal mb-7">
        Enter municipal, gemarkung, Flur, and Flurstück
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <Input
            variant="profile"
            label="Municipal"
            required
            id="municipality_name"
            name="municipality_name"
            placeholder="Enter Municipal"
            value={formData.municipality_name}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            variant="profile"
            label="Gemarkung"
            required
            id="district_name"
            name="district_name"
            placeholder="Enter Gemarkung"
            value={formData.district_name}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            variant="profile"
            label="Flur"
            required
            id="cadastral_area"
            name="cadastral_area"
            placeholder="Enter Flur"
            value={formData.cadastral_area}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            variant="profile"
            label="Flurstück"
            required
            id="cadastral_parcel"
            name="cadastral_parcel"
            placeholder="Enter Flurstück"
            value={formData.cadastral_parcel}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-4 flex justify-end space-x-4">
          <Button variant="bluePrimary" type="button" onClick={() => resetFields()}>
            Auswählen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchByAttributesUpdated;
