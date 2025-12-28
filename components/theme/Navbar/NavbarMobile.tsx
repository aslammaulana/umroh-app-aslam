"use client";

import Link from 'next/link';
import React, { useState } from "react";
import Image from 'next/image';
import { HiHome, HiOutlineUser, HiOutlinePlus, HiMenuAlt3, HiX, HiFolderOpen } from 'react-icons/hi';
// Asumsi: Pastikan komponen Button ini mendukung props 'onClick'
import Button from '@/components/elements/Button'; 

export default function NavbarMobile() {
    const [isClick, setIsClick] = useState(false);

    const toggleNavbar = (): void => {
        setIsClick(!isClick);
    };

    // Fungsi baru: Menutup navbar setelah navigasi
    const closeNavbar = (): void => {
        setIsClick(false);
    };

    const logoSrc = "/NawayaAssets/LogoNawaya.svg";

    return (
        <div className='lg:hidden sticky top-0 inset-x-0 z-20 bg-white shadow-md'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-15'>
                <Link href="/" className="relative flex items-center gap-2 w-[180px] h-12">
                    <Image
                        src={logoSrc}
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </Link>
                <button
                    className="p-2 rounded text-[#2a5341] hover:text-[#2a5341] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2a5341]"
                    onClick={toggleNavbar}
                >
                    {isClick ? (
                        <HiX size={24} />
                    ) : (
                        <HiMenuAlt3 size={24} />
                    )}
                </button>
            </div>

            {isClick && (
                <div className="p-3">
                    <Button
                        icon={<HiHome size={15} className='fill-current w-4 h-4 mr-3' />}
                        text="Beranda"
                        href="/"
                        // Tambahkan onClick untuk menutup menu
                       
                        className="font-medium hover:bg-[#22416d] hover:text-white "
                    />
                    <Button
                        icon={<HiFolderOpen size={15} className='fill-current w-4 h-4 mr-3' />}
                        text="Paket Umroh"
                        // Ini adalah navigasi ke root page dengan anchor link
                        href="/#paket" 
                        // Tambahkan onClick untuk menutup menu
                      
                        className="mt-2 font-medium hover:bg-[#22416d] hover:text-white"
                    />
                    <Button
                        icon={<HiOutlineUser size={15} className='fill-current w-4 h-4 mr-3' />}
                        text="Galeri Jamaah"
                        href="/#galeri"
                        // Tambahkan onClick untuk menutup menu
                      
                        className="mt-2 font-medium hover:bg-[#22416d] hover:text-white"
                    />
                </div>
            )}
        </div>
    );
}