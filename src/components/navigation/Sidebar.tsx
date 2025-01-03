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
  // const userRole = user.role;
  const role = user.role;
  let userRole = 'landowner';
  if (user && role === 'landowner') {
    userRole = 'landowner';
  } else if (user && role === 'developer') {
    userRole = 'developer';
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
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className='bg-white h-full w-[230px] flex flex-col justify-between items-center shadow-md pt-[70px]'>
      <div className='flex flex-col space-y-3'>
        {userRole === 'landowner' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/landowner'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner')}
            >
              <FaRocket className='mr-3' />
              Start
            </Button>
            <Button
              variant={
                activeRoute === '/landowner/new-plot'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/new-plot')}
            >
              <FaTh className='mr-3' />
              Neues Flurstück
            </Button>

            <Button
              variant={
                activeRoute === '/landowner/my-plots'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/my-plots')}
            >
              <FaMapLocationDot className='mr-3' />
              My Flurstücke
            </Button>

            <Button
              variant={
                activeRoute === '/landowner/my-offers'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/my-offers')}
            >
              <RiDiscountPercentLine className='mr-3' />
              My Angebote
            </Button>

            <Button
              variant={
                activeRoute === '/landowner/friend-invite'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/friend-invite')}
            >
              <FaUserPlus className='mr-3' />
              Einen Freund einladen
            </Button>

            <Button
              variant={
                activeRoute === '/landowner/questions-help'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/questions-help')}
            >
              <FaQuestionCircle className='mr-3' />
              Fragen/Hilfe
            </Button>
          </Fragment>
        )}

        {userRole === 'developer' && (
          <Fragment>
            <Button
              variant={
                activeRoute === '/developer'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer')}
            >
              <FaRocket className='mr-3' />
              Start
            </Button>
            <Button
              variant={
                activeRoute === '/developer/plots-search'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/plots-search')}
            >
              <FaMapLocationDot className='mr-3' />
              Flurstücke suchen
            </Button>

            <Button
              variant={
                activeRoute === '/developer/my-watchlist'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/my-watchlist')}
            >
              <HiOutlineClipboardList className='mr-3' />
              My Watchlist
            </Button>

            <Button
              variant={
                activeRoute === '/developer/active-auctions'
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/active-auctions')}
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
