"use client";

import React from "react";
import { FaBed, FaLocationDot } from "react-icons/fa6";
import { MdDocumentScanner } from "react-icons/md";
import Image from "next/image";

type HotelProps = {
  name: string;
  image: string;
  rate: number;
  location: string;
  description: string;
};

export default function HotelMadinah({
  name,
  image,
  rate,
  location,
  description,
}: HotelProps) {
  return (
    <div className="w-full">
      
      {/* Card */}
      <div className="bg-white p-5 shadow-md text-[15px] mt-2 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:basis-[40%]">
          {/* Image */}
          <div className="w-[270px] h-[300px] rounded-md overflow-hidden shadow-sm border">
            <Image
              src={image}
              alt={name}
              width={270}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Info */}
        <div className="w-full md:basis-[60%] flex flex-col gap-5">
          <div>
            <h2 className="text-[22px] font-bold text-[#003d57] leading-tight">
              {name}
            </h2>

            {/* Hotel Rate */}
            <div className="inline-flex items-center mt-2 px-3 py-1 rounded-md bg-[#003d57] gap-3">
              <p className="text-white text-[12px] font-bold">HOTEL RATE</p>
              <div className="text-yellow-400 text-lg">
                {"★".repeat(rate)}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#003d57]/10 rounded-lg text-[#003d57]">
              <FaLocationDot size={18} />
            </div>
            <div>
              <p className="text-gray-500 ">Lokasi</p>
              <p className="font-bold">{location}</p>
            </div>
          </div>

          {/* Detail */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-[#003d57]/10 rounded-lg text-[#003d57]">
              <MdDocumentScanner size={18} />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 ">Info Detail</p>
              <p className="font-medium text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
