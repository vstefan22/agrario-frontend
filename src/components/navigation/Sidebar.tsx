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
  const { clearAuth, user } = useAuthStore();

  // TODO: use actual role from user object when provided
  let userRole: string = 'role-one';
  if (user.role === 'role-one') {
    userRole = 'role-one';
  }
  if (user.role === 'role-two') {
    userRole = 'role-two';
  }
  const [activeRoute, setActiveRoute] = useState(`/${userRole}`);

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
        {userRole === 'role-one' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/role-one'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one')}
            >
              <FaRocket className='mr-3' />
              Start
            </Button>
            <Button
              variant={
                activeRoute === '/role-one/new-plot'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one/new-plot')}
            >
              <FaTh className='mr-3' />
              Neues Flurstück
            </Button>

            <Button
              variant={
                activeRoute === '/role-one/my-plots'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one/my-plots')}
            >
              <FaMapLocationDot className='mr-3' />
              Meine Flurstücke
            </Button>

            <Button
              variant={
                activeRoute === '/role-one/my-offers'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one/my-offers')}
            >
              <RiDiscountPercentLine className='mr-3' />
              Meine Angebote
            </Button>

            <Button
              variant={
                activeRoute === '/role-one/friend-invite'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one/friend-invite')}
            >
              <FaUserPlus className='mr-3' />
              Einen Freund einladen
            </Button>

            <Button
              variant={
                activeRoute === '/role-one/questions-help'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-one/questions-help')}
            >
              <FaQuestionCircle className='mr-3' />
              Fragen/Hilfe
            </Button>
          </Fragment>
        )}

        {userRole === 'role-two' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/role-two'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-two')}
            >
              <FaRocket className='mr-3' />
              Start
            </Button>
            <Button
              variant={
                activeRoute === '/role-two/flurstucke-suchen'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-two/flurstucke-suchen')}
            >
              <FaMapLocationDot className='mr-3' />
              Flurstücke suchen
            </Button>

            <Button
              variant={
                activeRoute === '/role-two/meine-watchlist'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-two/meine-watchlist')}
            >
              <HiOutlineClipboardList className='mr-3' />
              Meine Watchlist
            </Button>

            <Button
              variant={
                activeRoute === '/role-two/aktive-auktionen'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/role-two/aktive-auktionen')}
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
