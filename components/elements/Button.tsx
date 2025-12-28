import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  icon?: React.ReactNode;
  text: string;
  href: string;
  className?: string;
  onClick?: () => void; // Tambahkan properti ini
}

const Button: React.FC<ButtonProps> = ({ icon, text, href, className = '', onClick }) => {
  return (
    <Link href={href} className="w-full">
      <button
        onClick={onClick} // jalankan di sini
        className={`flex items-center w-full p-3 rounded-sm font-medium bg-[#dddce9] text-[15px] transition-colors hover:text-white ${className}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default Button;
