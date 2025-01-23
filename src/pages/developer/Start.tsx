import { useNavigate } from 'react-router-dom';
import ActionCard from '../../components/start/ActionCard';
import useAuthStore from '../../store/auth-store';
import cardImg1 from '../../assets/images/search-parcel.webp';
import cardImg2 from '../../assets/images/profile-change.webp';

const StartDeveloper = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Willkommen, {user?.first_name}
      </h1>
      <div className='flex space-x-8'>
        <ActionCard
          buttonText='Erste Schritte'
          videoSrc='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
          isVideo
          onClick={() => {}}
        />
        <ActionCard
          buttonText='Flurstück suchen'
          imageSrc={cardImg1}
          onClick={() => {
            navigate('/developer/registered-plots');
          }}
        />
        <ActionCard
          buttonText='Profil vervollständigen'
          imageSrc={cardImg2}
          onClick={() => {
            navigate('/developer/profile');
          }}
        />
      </div>
    </div>
  );
};

export default StartDeveloper;
