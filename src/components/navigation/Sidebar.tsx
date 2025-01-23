import { Fragment } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import {
  FaRocket,
  FaTh,
  FaUserPlus,
  FaQuestionCircle,
  FaSignOutAlt,
  FaGavel,
} from 'react-icons/fa';
import { LuHandHelping } from 'react-icons/lu';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { HiOutlineClipboardList } from 'react-icons/hi';
import Button from '../common/Button';
import useAuthStore from '../../store/auth-store';
import useClearStorage from '../../store/clear-storage';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { clearStorage } = useClearStorage();

  const userRole = user?.role;

  const isRouteActive = (basePath: string, exact = false) => {
    if (exact) {
      return location.pathname === basePath;
    }
    return (
      location.pathname === basePath ||
      location.pathname.startsWith(basePath + '/')
    );
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearStorage();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-white h-full w-[230px] flex flex-col justify-between items-center shadow-md pt-[70px]'>
      <div className='flex flex-col space-y-3'>
        {userRole === 'landowner' && (
          <Fragment>
            <Button
              variant={
                isRouteActive('/landowner', true)
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
                isRouteActive('/landowner/new-plot')
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
                isRouteActive('/landowner/my-plots')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/my-plots')}
            >
              <FaMapLocationDot className='mr-3' />
              Meine Flurstücke
            </Button>

            <Button
              variant={
                isRouteActive('/landowner/my-offers')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/landowner/my-offers')}
            >
              <RiDiscountPercentLine className='mr-3' />
              Meine Anzeigen
            </Button>

            <Button
              variant={
                isRouteActive('/landowner/friend-invite')
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
                isRouteActive('/landowner/questions-help')
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
                isRouteActive('/developer', true)
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
                isRouteActive('/developer/registered-plots')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/registered-plots')}
            >
              <FaMapLocationDot className='mr-3' />
              Flurstücke suchen
            </Button>

            <Button
              variant={
                isRouteActive('/developer/my-watchlist')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/my-watchlist')}
            >
              <HiOutlineClipboardList className='mr-3' />
              Meine Watchlist
            </Button>

            <Button
              variant={
                isRouteActive('/developer/active-auctions')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/active-auctions')}
            >
              <LuHandHelping className='mr-3 scale-x-[-1]' />
              Aktive Anzeigen
            </Button>

            <Button
              variant={
                isRouteActive('/developer/my-auctions')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/my-auctions')}
            >
              <FaGavel className='mr-3 scale-x-[-1]' />
              Meine Gebote
            </Button>

            <Button
              variant={
                isRouteActive('/developer/questions-help')
                  ? 'sidebarPrimary'
                  : 'sidebarSecondary'
              }
              onClick={() => handleNavigate('/developer/questions-help')}
            >
              <FaQuestionCircle className='mr-3' />
              Fragen/Hilfe
            </Button>
          </Fragment>
        )}
      </div>

      <div className='mb-4'>
        <Button variant='sidebarSecondary' onClick={handleLogout}>
          <FaSignOutAlt className='mr-3 text-gray-medium' />
          Abmelden
        </Button>
        <div className='flex gap-1 text-sm'>
          <Link to={`/${userRole}/terms-and-conditions`} className='underline'>
            AGB
          </Link>
          <p>und</p>
          <Link to={`/${userRole}/privacy-policy`} className='underline'>
            Datenschutzerklärung
          </Link>
        </div>
      </div>
    </div>
  );
}
