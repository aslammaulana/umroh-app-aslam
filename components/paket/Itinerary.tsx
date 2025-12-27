'use client';

import React from "react";
import { FaMapSigns } from "react-icons/fa"; 
import Image from "next/image";

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
  if (!itineraries || itineraries.length === 0) {
    return null; // tidak menampilkan jika kosong
  }

  return (
    <div className="mt-[30px]">
      {/* Header */}
      <div className="flex justify-start items-center gap-5 mb-3">
        <div className="p-3 bg-[#003d57] rounded-lg rounded-br-none rounded-bl-none text-white">
          <FaMapSigns />
        </div>
        <p className="font-bold text-[#003d57]">Itinerary</p>
      </div>
      <div className="border-t-2 border-[#003d57] mb-5"></div>

      {/* List */}
      {itineraries.map(item => (
        <div key={item.day_number} className="bg-white p-5 shadow-md text-[15px] mb-4">
          <div className="flex justify-start items-center gap-3 mb-3">
            <div className="px-5 py-3 bg-[#003d57] rounded-lg rounded-tr-none rounded-br-none text-white">
              <p>{item.day_number}</p>
            </div>
            <div className="px-5 py-3 bg-[#e4ebff] rounded-lg rounded-tl-none rounded-bl-none">
              {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }) : '-'}
            </div>
            <div className="ml-3 font-semibold">{item.title}</div>
          </div>
          <div className="mt-3 leading-relaxed whitespace-pre-line max-h-full overflow-y-auto">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}
