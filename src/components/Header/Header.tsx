import Image from 'next/image';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-white w-full h-[123px] flex justify-between items-center px-6 shadow-md">
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/images/header_logo.png"
            alt="Header Logo"
            width={44 * (169 / 44)}
            height={44}
          />
        </Link>
      </div>

      <Link
        href="/profile"
        className="bg-[#206F6A]/50 text-[#206F6A] w-[72px] h-[72px] rounded-full flex items-center justify-center hover:bg-[#206F6A]/30 transition-colors duration-300"
        aria-label="Go to Profile"
      >
        <FaUserAlt size={36} />
      </Link>
    </header>
  );
}
