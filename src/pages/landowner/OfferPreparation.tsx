import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import OfferPreparationItem from "../../components/landowner/my-plots/OfferPreparationItem";
import Button from "../../components/common/Button";
import DatePicker from "../../components/common/DatePicker";
import Select from "../../components/common/Select";
import Checkbox from "../../components/common/Checkbox";
import TextArea from "../../components/common/TextArea";
import UploadFile from "../../components/common/UploadFile";
import useOffers from "../../hooks/offer-hook";
import usePlotStore from "../../store/plot-store";
import {
  utilization,
  preferredRegionality,
  shareholderModel,
  optionsMap,
} from "../../constants/select-options";
import { validateOfferDetailForm } from "../../utils/helper-functions";
import { OfferPreparationType } from "../../types/offer-types";
import { LoadingSpinner } from "../../components/common/Loading";

const initialFormData = {
  available_from: null as Date | null,
  utilization: undefined as string | undefined,
  preferred_regionality: undefined as string | undefined,
  shareholder_model: undefined as string | undefined,
  no_usage_restriction: false,
  wind_energy_restriction: false,
  solar_energy_restriction: false,
  energy_storage_restriction: false,
  eco_enhancements_restriction: false,
  important_remarks: "",
  hide_from_search: false,
  documented_offers: [] as File[],
  is_owner_or_authorized: false,
  accept_privacy_policy: false,
  accept_terms: false,
  other: false,
};

export default function MyOffer() {
  const navigate = useNavigate();
  const { plot } = usePlotStore();
  const { addOffer } = useOffers();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OfferPreparationType>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      available_from: date,
    }));
    if (errors.available_from) {
      setErrors((prev) => ({
        ...prev,
        available_from: "",
      }));
    }
  };

  const handleCriteriaChange = (name: string, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFilesChange = (documented_offers: File[]) => {
    setFormData((prev) => ({
      ...prev,
      documented_offers,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isFormValidate } = validateOfferDetailForm(formData);
    const parcelIds = [plot?.id];

    try {
      if (isFormValidate) {
        const formDataSend = new FormData();
        formDataSend.append(
          "available_from",
          formData.available_from ? formData.available_from.toISOString().split("T")[0] : ""
        );
        if (formData.utilization)
          formDataSend.append("utilization", optionsMap[formData.utilization] || "");
        if (formData.preferred_regionality)
          formDataSend.append(
            "preferred_regionality",
            optionsMap[formData.preferred_regionality] || ""
          );
        if (formData.shareholder_model)
          formDataSend.append("shareholder_model", optionsMap[formData.shareholder_model] || "");
        formDataSend.append("important_remarks", formData.important_remarks || "");
        const criteria = {
          no_usage_restriction: formData.no_usage_restriction,
          wind_energy_restriction: formData.wind_energy_restriction,
          solar_energy_restriction: formData.solar_energy_restriction,
          energy_storage_restriction: formData.energy_storage_restriction,
          eco_enhancements_restriction: formData.eco_enhancements_restriction,
        };
        formDataSend.append("criteria", JSON.stringify(criteria));
        if (formData.hide_from_search)
          formDataSend.append("hide_from_search", formData.hide_from_search.toString());
        if (formData.documented_offers.length > 0) {
          formData.documented_offers.forEach((file) => {
            formDataSend.append("documented_offers", file);
          });
        }
        formDataSend.append("is_owner_or_authorized", formData.is_owner_or_authorized.toString());
        formDataSend.append("accept_privacy_policy", formData.accept_privacy_policy.toString());
        formDataSend.append("accept_terms", formData.accept_terms.toString());
        formDataSend.append("other", formData.other.toString());
        formDataSend.append("parcel_ids", JSON.stringify(parcelIds));
        setLoading(true);
        await addOffer(formDataSend);
        setLoading(false);
        navigate("/landowner/my-plots/thank-you-marketing-request");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error: ", err);
    }
  };

  const handleClearFields = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-7 pt-4">
      <h1 className="text-[32px] font-bold text-black-muted">Vorbereitung des Angebotes</h1>
      <div className="flex mt-6 flex-col gap-6">
        <OfferPreparationItem data={plot} />
      </div>
      <div>
        <h1 className="text-[32px] font-bold text-black-muted mt-4">Ihre Kriterien</h1>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-6">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <DatePicker
                label="Grundstück verfügbar ab"
                value={formData.available_from}
                onChange={handleDateChange}
                placeholder="DD/MM/YY"
                required
              />
              {errors.available_from && (
                <span className="text-red-500 text-sm">{errors.available_from}</span>
              )}
            </div>
            <div className="flex flex-col">
              <Select
                name="utilization"
                label="Sind Sie offen für Verpachtung oder für Verkauf"
                options={utilization}
                value={formData.utilization}
                onChange={handleCriteriaChange}
                required
              />
              {errors.utilization && (
                <span className="text-red-500 text-sm">{errors.utilization}</span>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <Select
                name="preferred_regionality"
                label="Regionalität des Projektentwicklers"
                options={preferredRegionality}
                value={formData.preferred_regionality}
                onChange={handleCriteriaChange}
                required
              />
              {errors.preferred_regionality && (
                <span className="text-red-500 text-sm">{errors.preferred_regionality}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Select
                name="shareholder_model"
                label="Welche zusätzlichen Formen der Beteiligung sind Ihnen wichtig"
                options={shareholderModel}
                value={formData.shareholder_model}
                onChange={handleCriteriaChange}
                required
              />
              {errors.shareholder_model && (
                <span className="text-red-500 text-sm">{errors.shareholder_model}</span>
              )}
            </div>
          </div>

          <p className="text-[16px] font-400 text-primary mt-4">
            Wollen Sie einzelne Nutzungsmöglichkeiten für Ihr Grundstück ausschließen?
          </p>

          <div className="flex gap-8 w-[800px] justify-between">
            <Checkbox
              label="Keine Auschluss von Nutzungsmöglichkeiten"
              name="no_usage_restriction"
              variant="primary"
              checked={formData.no_usage_restriction}
              onChange={handleChange}
            />
            <Checkbox
              label="Keine Nutzung von Windenergie"
              name="wind_energy_restriction"
              variant="primary"
              checked={formData.wind_energy_restriction}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-8 w-[800px] justify-between">
            <Checkbox
              label="Keine Nutzung von Solarenergie"
              name="solar_energy_restriction"
              variant="primary"
              checked={formData.solar_energy_restriction}
              onChange={handleChange}
            />
            <Checkbox
              label="Keine Nutzung von Energiespeicher"
              name="energy_storage_restriction"
              variant="primary"
              checked={formData.energy_storage_restriction}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-8">
            <Checkbox
              label="Keine Nutzung für ökologische Aufwertungen"
              name="eco_enhancements_restriction"
              variant="primary"
              checked={formData.eco_enhancements_restriction}
              onChange={handleChange}
            />
          </div>

          <TextArea
            id="important_remarks"
            name="important_remarks"
            value={formData.important_remarks}
            onChange={handleChange}
            label=""
            placeholder="Ihre Nachricht an uns"
          />

          <UploadFile onFilesChange={handleFilesChange} />

          <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col">
              <Checkbox
                label="Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein ."
                name="is_owner_or_authorized"
                variant="primary"
                checked={formData.is_owner_or_authorized}
                onChange={handleChange}
              />
              {errors.is_owner_or_authorized && (
                <span className="text-red-500 text-sm">{errors.is_owner_or_authorized}</span>
              )}
            </div>
            <div className="flex flex-col">
              <Checkbox
                label="Ja, ich akzeptiere die Datenschutzbedingungen"
                name="accept_privacy_policy"
                variant="primary"
                checked={formData.accept_privacy_policy}
                onChange={handleChange}
              />
              {errors.accept_privacy_policy && (
                <span className="text-red-500 text-sm">{errors.accept_privacy_policy}</span>
              )}
            </div>
            <div className="flex flex-col">
              <Checkbox
                label="Ja, ich akzeptiere die AGBs"
                name="accept_terms"
                variant="primary"
                checked={formData.accept_terms}
                onChange={handleChange}
              />
              {errors.accept_terms && (
                <span className="text-red-500 text-sm">{errors.accept_terms}</span>
              )}
            </div>
            <div className="flex flex-col">
              <Checkbox
                label="Ja, ich..."
                name="other"
                variant="primary"
                checked={formData.other}
                onChange={handleChange}
              />
              {errors.other && <span className="text-red-500 text-sm">{errors.other}</span>}
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end space-x-4">
            <Button variant="blueSecondary" type="button" onClick={handleClearFields}>
              Abbrechen
            </Button>
            <Button variant="bluePrimary" type="submit" className="w-[320px] mb-8">
              Vermarktungsanfrage absenden
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
