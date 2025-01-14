import { FC, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import NavLink from '../common/NavLink';
import Navbar from '../common/Navbar';
import useAuthStore from '../../store/auth-store';
import headerLogo from '../../assets/images/header_logo.png';
import messageIcon from '../../assets/images/msg-icon.png';
import moreIcon from '../../assets/images/more.png';
import useMessages from '../../hooks/message-hook';

const NavBar: FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.role;
  const { getUnreadMessages } = useMessages();
  const [unreadCount, setUnreadCount] = useState(0);

  // TODO: Add backend functionality for unread messages
  useEffect(() => {
    const unreadMessages = async () => {
      try {
        if (user?.id) {
          const response = await getUnreadMessages(user.id);
          setUnreadCount(response.unreadCount || 0);
        }
      } catch (err) {
        console.error('Failed to fetch unread messages: ', err);
      }
    };

    unreadMessages();
  }, [user?.id, getUnreadMessages]);

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
            <div className='relative'>
              <img src={messageIcon} alt='msg icon' className='mr-6' />

              {unreadCount > 0 && (
                <span
                  className='absolute top-[2px] right-[24px] bg-red-500 text-white text-[12px] rounded-full w-[18px] h-[18px] flex items-center justify-center'
                  style={{ transform: 'translate(50%, -50%)' }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
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
