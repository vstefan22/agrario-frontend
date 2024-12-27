import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import {
  FaRocket,
  FaTh,
  FaUserPlus,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { HiOutlineClipboardList } from 'react-icons/hi';
import Button from '../common/Button';

import useAuthStore from '../../store/auth-store';

export default function Sidebar() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  // TODO: use role from user object when provided
  const userRole: string = 'role-1';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearAuth();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='bg-white h-full w-[230px] flex flex-col justify-between items-center shadow-md pt-[70px]'>
      <div className='flex flex-col space-y-3'>
        <Button variant='sidebarPrimary' onClick={() => navigate('/')}>
          <FaRocket className='mr-3' />
          Start
        </Button>

        {userRole === 'role-1' && (
          <Fragment>
            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/neues-flurstuck')}
            >
              <FaTh className='mr-3 text-gray-medium' />
              Neues Flurstück
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/meine-flurstucke')}
            >
              <FaMapLocationDot className='mr-3 text-gray-medium' />
              Meine Flurstücke
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/meine-angebote')}
            >
              <RiDiscountPercentLine className='mr-3 text-gray-medium' />
              Meine Angebote
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/einen-freund-einladen')}
            >
              <FaUserPlus className='mr-3 text-gray-medium' />
              Einen Freund einladen
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/fragen-hilfe')}
            >
              <FaQuestionCircle className='mr-3 text-gray-medium' />
              Fragen/Hilfe
            </Button>
          </Fragment>
        )}

        {userRole === 'role-2' && (
          <Fragment>
            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/flurstucke-suchen')}
            >
              <FaMapLocationDot className='mr-3 text-gray-medium' />
              Flurstücke suchen
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/meine-watchlist')}
            >
              <HiOutlineClipboardList className='mr-3 text-gray-medium' />
              Meine Watchlist
            </Button>

            <Button
              variant='sidebarSecondary'
              onClick={() => navigate('/aktive-auktionen')}
            >
              <FaSignOutAlt className='mr-3 text-gray-medium' />
              Aktive Auktionen
            </Button>
          </Fragment>
        )}
      </div>

      <div className='mb-4'>
        <Button variant='sidebarSecondary' onClick={handleLogout}>
          <FaSignOutAlt className='mr-3 text-gray-medium' />
          Logout
        </Button>
      </div>
    </div>
  );
}
