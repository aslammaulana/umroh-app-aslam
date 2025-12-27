'use client';

import React, { useState } from "react";
import { FaMapSigns } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type ItineraryItem = {
  day_number: number;
  tanggal: string | null;
  title: string;
  description: string;
};

type Props = {
  itineraries: ItineraryItem[];
};

export default function Itinerary({ itineraries }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!itineraries || itineraries.length === 0) {
    return null;
  }

  return (
    <div className="mt-[30px]">
      {/* Header */}
      <div
        className="flex justify-start items-center gap-5 cursor-pointer rounded-tl-md border-t-[2px] border-r-[2px] border-[#b1b1b136] pr-3 rounded-tl-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-3 bg-[#003d57] rounded-md rounded-br-none rounded-bl-none text-white">
          <FaMapSigns />
        </div>
        <div className="">

        <p className="font-bold text-[#003d57]">Itinerary</p>
        </div>
        <div className="ml-auto">
          {isOpen ? <IoMdArrowDropup size={22} /> : <IoMdArrowDropdown size={22} />}
        </div>
      </div>
      <div className="border-t-2 border-[#003d57]"></div>

      {/* List */}
      {isOpen && itineraries.map(item => (
        <div key={item.day_number} className="bg-white p-5 shadow-md text-[15px] mb-4">
          <div className="flex justify-start items-center mb-3">
            <div className="px-4 py-1.5 bg-[#003d57] shadow-sm rounded-sm rounded-tr-none rounded-br-none text-white">
              <p>{item.day_number}</p>
            </div>
            <div className="px-3 py-1.5 bg-[#e4ebff] shadow-sm rounded-sm rounded-tl-none rounded-bl-none ml-2">
              {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }) : '-'}
            </div>
            <div className="ml-3 font-semibold">{item.title}</div>
          </div>
          <div className="mt-3 leading-relaxed whitespace-pre-line">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}
