import einenImg from "../../assets/images/fragen-hilfe-top.png";
import Button from "../../components/common/Button";

const EinenFreundEinladen = () => {
  function handleGoToLink() {
    console.log("Go to link")
  }


  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>Einen Freund Einladen</h1>

      <div className="flex gap-8">
        <img src={einenImg} alt="Einen Freund Einladen Image"
          className="rounded-2xl w-[360px] h-[276px] object-cover" />
        <div className="flex flex-col justify-between flex-1 space-y-6 leading-[29px]">
          <div className="text-gray-dark-100 text-[18px] space-y-6">
            <p>Erzählen Sie ihren Freunden und Bekannten von Agrario.Klicken Sie auf den unten stehenden Link. Wir senden Ihnen dann auf Ihre Email-Adresse/Telefonnummer einen privaten Einladungslink zu.</p>
            <p>Versenden Sie diesen Link an Freunde und Verwandte Für jede Registrierung über diesen Einladungslink erhalten Sie einen Gutschein für eine Gartis-Grundstücksanalyse PLUS</p>
          </div>
          <div className="flex justify-end mt-auto">
            <Button variant="bluePrimary" className="w-[274px] h-[48px]"
              onClick={handleGoToLink}>Einladungslink anfordern</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EinenFreundEinladen;
