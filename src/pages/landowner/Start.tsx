import ActionCard from "../../components/start/ActionCard";
import cardImg1 from "../../assets/images/card-img1.png";
import cardImg2 from "../../assets/images/card-img-2.png";
import { useNavigate } from "react-router-dom";


const StartLandowner = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
            <h1 className='text-[32px] font-bold text-black-muted mb-6'>
                Willkommen, Alexander
            </h1>

            <div className="flex space-x-8">
                <ActionCard buttonText="Erste Schritte" videoSrc="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" isVideo onClick={() => { }} />
                <ActionCard buttonText="Neues Flurstuckanlegen" imageSrc={cardImg1} onClick={() => { navigate("/landowner/new-plot") }} />
                <ActionCard buttonText="Profil vervollständigen" imageSrc={cardImg2} onClick={() => { navigate("/landowner/profile") }} />
            </div>
        </div>
    );
}

export default StartLandowner;