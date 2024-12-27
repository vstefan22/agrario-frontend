import { FC } from 'react';

type NavbarProps = {
  className?: string;
  children: React.ReactNode;
};

const Navbar: FC<NavbarProps> = ({ className, children }) => {
  return <nav className={`bg-white shadow-md ${className}`}>{children}</nav>;
};

export default Navbar;
