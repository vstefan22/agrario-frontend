import { FC } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import NavLink from '../common/NavLink';
import Navbar from '../common/Navbar';
import useAuthStore from '../../store/auth-store';
import headerLogo from '../../assets/images/header_logo.png';

const NavBar: FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Navbar className='w-full h-[80px] flex justify-between items-center px-6'>
      <div className='flex-shrink-0'>
        <NavLink href='/'>
          <img
            src={headerLogo}
            alt='Header Logo'
            width={140}
            height={40}
            style={{ height: '40px', width: 'auto' }}
          />
        </NavLink>
      </div>

      <NavLink
        href='/profile'
        className='bg-primary/50 text-primary w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden hover:bg-primary/30'
        ariaLabel='Go to Profile'
      >
        {isAuthenticated && user?.profilePicture ? (
          <img
            height={40}
            width={40}
            src={user.profilePicture}
            alt='User Profile'
            className='w-full h-full object-cover'
          />
        ) : (
          <FaUserAlt size={30} />
        )}
      </NavLink>
    </Navbar>
  );
};

export default NavBar;
