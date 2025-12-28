'use client';

import React, { useState } from 'react';
import { FaBed } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import HotelMekkah from './HotelMekkah';
import HotelMadinah from './HotelMadinah';
import { hotels } from '@/data/hotels';
import { Package, Hotel } from '@/types';

interface HotelProps {
  pkg: Package;
}

export default function HotelSection({ pkg }: HotelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const hotelMekkah: Hotel | null =
    hotels.find(h => String(h.id) === String(pkg.hotel_mekkah_id)) ?? null;

  const hotelMadinah: Hotel | null =
    hotels.find(h => String(h.id) === String(pkg.hotel_madinah_id)) ?? null;

  return (
    <div>
      {/* Header Accordion */}
      <div className="mt-[30px]">
        <div
          className="flex items-center gap-5 cursor-pointer pr-3 border-r-[2px] border-[#b1b1b136]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="p-3 bg-[#003d57] rounded-t-md text-white">
            <FaBed />
          </div>
          <p className="font-bold text-[#003d57] tracking-wide">
            Hotel
          </p>
          <div className="ml-auto text-[#003d57]">
            {isOpen ? <IoMdArrowDropup size={22} /> : <IoMdArrowDropdown size={22} />}
          </div>
        </div>
        <div className="border-t-2 border-[#003d57]" />
      </div>

      {/* Content */}
      {isOpen && (
        <div className="">
          {hotelMekkah && (
            <HotelMekkah
              name={hotelMekkah.name}
              image={hotelMekkah.image}
              rate={hotelMekkah.rate}
              location={hotelMekkah.location}
              description={hotelMekkah.description}
            />
          )}

          {hotelMadinah && (
            <HotelMadinah
              name={hotelMadinah.name}
              image={hotelMadinah.image}
              rate={hotelMadinah.rate}
              location={hotelMadinah.location}
              description={hotelMadinah.description}
            />
          )}
        </div>
      )}
    </div>
  );
}
