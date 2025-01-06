import { FC } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import NavLink from '../common/NavLink';
import Navbar from '../common/Navbar';
import useAuthStore from '../../store/auth-store';
import headerLogo from '../../assets/images/header_logo.png';
import messageIcon from '../../assets/images/msg-icon.png';

const NavBar: FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  let userRole = 'landowner';
  if (user && user.role === 'landowner') {
    userRole = 'landowner';
  }
  if (user && user.role === 'developer') {
    userRole = 'developer';
  }
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

      <div className='flex items-center'>
        <NavLink href={`/${userRole}/messages`} ariaLabel='Go to Messages'>
          <img src={messageIcon} alt='msg icon' className='mr-8' />
        </NavLink>

        <NavLink
          href={`/${userRole}/profile`}
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
      </div>
    </Navbar>
  );
};

export default NavBar;
