import { FC } from 'react';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

const NavLink: FC<NavLinkProps> = ({
  href,
  className,
  ariaLabel,
  children,
}) => {
  return (
    <Link
      to={href}
      className={`transition-colors duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default NavLink;
