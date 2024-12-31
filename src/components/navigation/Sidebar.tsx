import { Fragment, useState } from 'react';
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
  const [activeRoute, setActiveRoute] = useState('/');

  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    navigate(route);
  };

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
        <Button
          variant={activeRoute === '/' ? 'sidebarPrimary' : 'sidebarSecondary'}
          onClick={() => handleNavigate('/')}
        >
          <FaRocket className='mr-3' />
          Start
        </Button>

        {userRole === 'role-1' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/neues-flurstuck'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/neues-flurstuck')}
            >
              <FaTh className='mr-3' />
              Neues Flurstück
            </Button>

            <Button
              variant={
                activeRoute === '/meine-flurstucke'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/meine-flurstucke')}
            >
              <FaMapLocationDot className='mr-3' />
              Meine Flurstücke
            </Button>

            <Button
              variant={
                activeRoute === '/my-offer'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/my-offer')}
            >
              <RiDiscountPercentLine className='mr-3' />
              Meine Angebote
            </Button>

            <Button
              variant={
                activeRoute === '/einen-freund-einladen'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/einen-freund-einladen')}
            >
              <FaUserPlus className='mr-3' />
              Einen Freund einladen
            </Button>

            <Button
              variant={
                activeRoute === '/fragen-hilfe'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/fragen-hilfe')}
            >
              <FaQuestionCircle className='mr-3' />
              Fragen/Hilfe
            </Button>
          </Fragment>
        )}

        {userRole === 'role-2' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/flurstucke-suchen'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/flurstucke-suchen')}
            >
              <FaMapLocationDot className='mr-3' />
              Flurstücke suchen
            </Button>

            <Button
              variant={
                activeRoute === '/meine-watchlist'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/meine-watchlist')}
            >
              <HiOutlineClipboardList className='mr-3' />
              Meine Watchlist
            </Button>

            <Button
              variant={
                activeRoute === '/aktive-auktionen'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/aktive-auktionen')}
            >
              <FaSignOutAlt className='mr-3' />
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
