import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import useHttpRequest from "../../hooks/http-request-hook";
import { LoadingSpinner } from "../../components/common/Loading";

export default function Register() {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    position: "",
    address: "",
    zipcode: "",
    city: "",
    company_website: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    role: "landowner",
    privacy_accepted: false,
    terms_accepted: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;

    if (type === "checkbox" || type === "radio") {
      checked = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.address ||
      !formData.zipcode ||
      !formData.city ||
      !formData.phone_number ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus.");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Die Passwörter stimmen nicht überein.");
      return;
    }
    if (!formData.privacy_accepted || !formData.terms_accepted) {
      toast.error("Bitte akzeptieren Sie die Datenschutzbedingungen und AGB.");
      return;
    }

    setLoading(true);

    try {
      await sendRequest("/accounts/users/", "POST", {}, formData);
      navigate("/", {
        state: {
          message:
            "Bestätigungslink wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihr Konto.",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err.response?.data?.email?.[0] &&
        err.response.data.email[0] === "user with this email already exists."
      ) {
        toast.error("Ein Konto mit dieser E-Mail-Adresse existiert bereits.");
        return;
      }

      if (
        err.response?.data?.phone_number &&
        err.response.data.phone_number === "The phone number entered is not valid."
      ) {
        toast.error("Die eingegebene Telefonnummer ist ungültig.");
        return;
      }

      if (
        err.response?.data?.company_website?.[0] &&
        err.response.data.company_website[0] === "Enter a valid URL."
      ) {
        toast.error("Geben Sie eine gültige URL ein.");
        return;
      }

      if (err instanceof Error) {
        toast.error(err.message || "Ein Fehler ist aufgetreten.");
      } else {
        toast.error("Ein unbekannter Fehler ist aufgetreten.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-primary flex flex-col items-center justify-center px-4 min-h-screen p-12">
      <h1 className="text-[46px] font-bold mb-6 text-white">Registrierung</h1>
      <div className="w-full max-w-[960px] bg-white/10 border-[3px] border-[rgba(255,255,255,0.06)] rounded-[44px] p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Vorname"
            name="first_name"
            placeholder="Text hinzufügen"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Nachname"
            name="last_name"
            placeholder="Text hinzufügen"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <Input
            label="Name des Unternehmens"
            name="company_name"
            placeholder="Text hinzufügen"
            value={formData.company_name}
            onChange={handleChange}
          />
          <Input
            label="Ihre Position im Unternehmen"
            name="position"
            placeholder="Text hinzufügen"
            value={formData.position}
            onChange={handleChange}
          />
          <Input
            label="Anschrift/Strasse"
            name="address"
            placeholder="Text hinzufügen"
            value={formData.address}
            onChange={handleChange}
            required
            className="md:col-span-1"
          />

          <div className="grid grid-cols-2 gap-4 md:col-span-1">
            <Input
              label="PLZ"
              name="zipcode"
              placeholder="66651"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
            <Input
              label="Stadt"
              name="city"
              placeholder="Text hinzufügen"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Website des Unternehmens"
            name="company_website"
            placeholder="https://"
            value={formData.company_website}
            onChange={handleChange}
          />
          <Input
            label="Email Adresse"
            name="email"
            type="email"
            placeholder="max@musteradresse.de"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Telefonnummer"
            name="phone_number"
            type="tel"
            placeholder="+49 ..."
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <Input
              label="Passwort"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              variant="bluePrimary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[47%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none bg-transparent hover:bg-transparent"
            >
              {showPassword ? (
                <TbEye color="white" size={24} />
              ) : (
                <TbEyeOff color="white" size={24} />
              )}
            </Button>
          </div>
          <div className="relative">
            <Input
              label="Passwort bestätigen"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="******"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="md:col-span-1"
            />
            <Button
              variant="bluePrimary"
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[47%] right-3 flex items-center text-gray-dim h-auto w-auto !border-none bg-transparent hover:bg-transparent"
            >
              {showConfirmPassword ? (
                <TbEye color="white" size={24} />
              ) : (
                <TbEyeOff color="white" size={24} />
              )}
            </Button>
          </div>
          <div className="md:col-span-2 flex justify-between items-center">
            <Checkbox
              label="Ich aktzeptiere die Datenschutzbedingungen"
              name="privacy_accepted"
              checked={formData.privacy_accepted}
              onChange={handleChange}
            />
            <Checkbox
              label="Ich aktzeptiere die Allgemeinen Geschäftsbedingungen"
              name="terms_accepted"
              checked={formData.terms_accepted}
              onChange={handleChange}
              labelClassName="whitespace-nowrap max-md:whitespace-normal"
            />
          </div>

          <div className="md:col-span-2 flex justify-center space-x-4">
            <Button type="button" variant="secondary" onClick={() => navigate("/")}>
              Abbrechen
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} disabled={loading}>
              Weiter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
