import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Button from "../common/Button";
import useHttpRequest from "../../hooks/http-request-hook";
import useAuthStore from "../../store/auth-store";
import { ArrowLeft } from "../../assets/svgs/svg-icons";
import profilePlaceholder from "../../assets/images/profile-placeholder.png";

type PasswordChangeProps = {
  password: string;
  confirmPassword: string;
};

export default function PasswordChange() {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const { sendRequest } = useHttpRequest();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PasswordChangeProps>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Die Passwörter stimmen nicht überein.");
        return;
      }
    }

    setLoading(true);

    try {
      // TODO: use actual endpoint for change password
      await sendRequest(
        "/password-change/",
        "POST",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        formData
      );
      console.log("token: ", token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Ein Fehler ist aufgetreten.");
      } else {
        toast.error("Ein unbekannter Fehler ist aufgetreten.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-gray-lightest min-h-screen flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-[960px] bg-white border border-gray-medium rounded-[44px] p-8">
        <div className="flex justify-between items-center mb-6">
          <div
            className="flex items-center justify-center rounded-full bg-primary w-[40px] h-[40px] cursor-pointer"
            onClick={handleGoBack}
          >
            <ArrowLeft />
          </div>
          <div className="flex items-center">
            <div className="relative w-24 h-24 mr-4">
              <div className="relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden">
                <img
                  src={user?.profile_picture ? user.profile_picture : profilePlaceholder}
                  alt="Profilbild"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-dim">Ihr Profil,</h2>
              <p className="text-lg text-gray-dim">
                {user && user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : ""}
              </p>
            </div>
          </div>
          <div />
        </div>
        <hr className="mb-6 border-gray-medium" />
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-[32px] font-bold text-black-muted">Passwort ändern</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col justify-self-center w-[420px]">
          <Input
            variant="profile"
            label="Passwort bestätigen"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Input
            variant="profile"
            label="Passwort"
            required
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-center">
            <Button
              variant="bluePrimary"
              type="submit"
              className="w-[420px]"
              disabled={formData.password !== formData.confirmPassword || loading}
            >
              {loading ? "Änderungen speichern..." : "Änderungen speichern"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
