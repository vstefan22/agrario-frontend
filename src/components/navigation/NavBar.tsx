import { FC } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import NavLink from '../common/NavLink';
import Navbar from '../common/Navbar';
import useAuthStore from '../../store/auth-store';
import headerLogo from '../../assets/images/header_logo.png';
import messageIcon from '../../assets/images/msg-icon.png';
import moreIcon from '../../assets/images/more.png';

const NavBar: FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.role;
  return (
    <Navbar className='w-full h-[80px] flex justify-between items-center px-6'>
      <div className='flex-shrink-0'>
        <NavLink href={isAuthenticated ? `/${userRole}` : '/'}>
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
          {isAuthenticated && (
            <img src={messageIcon} alt='msg icon' className='mr-6' />
          )}
        </NavLink>

        {isAuthenticated && (
          <div className='flex items-center'>
            <NavLink
              href={`/${userRole}/profile`}
              className='bg-primary/50 text-primary w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden hover:bg-primary/30'
              ariaLabel='Go to Profile'
            >
              {isAuthenticated && user?.profile_picture ? (
                <img
                  height={40}
                  width={40}
                  src={user.profile_picture}
                  alt='User Profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <FaUserAlt size={30} />
              )}
            </NavLink>
            {isAuthenticated && user?.firstname && user?.lastname ? (
              <div className='ml-3 leading-[1.3] cursor-default flex'>
                <div className='mr-4'>
                  <p className='text-[14px] text-gray-dark-150'>
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p className='text-[10px] text-gray-dark-100'>Admin</p>
                </div>

                <button
                  onClick={() => {
                    console.log('more clicked');
                  }}
                >
                  <img src={moreIcon} alt='More Icon' />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default NavBar;
