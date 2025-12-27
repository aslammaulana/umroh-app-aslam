"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaHeadset } from 'react-icons/fa';
import { navLinks } from './Navlink';

export default function NavbarDekstop() {
  const logoSrc = "/NawayaAssets/LogoNawaya.svg";
  const contactUrl = "https://wa.me/6282298304077";

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // jika scroll ke bawah, sembunyikan navbar
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-sm hidden md:block transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2 w-[230px] h-12">
          <Image
            src={logoSrc}
            alt="Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="flex items-center justify-end gap-8">
          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="hover:text-[#418064] transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Tombol Hubungi Kami */}
          <Link
            href={contactUrl}
            target="_blank"
            className="flex items-center gap-2 rounded-full px-6 py-3 text-white font-semibold text-[14px] bg-[#418064] hover:bg-[#2b5844] transition-colors"
          >
            <FaHeadset />
            Hubungi Kami
          </Link>
        </div>
      </nav>
    </header>
  );
}