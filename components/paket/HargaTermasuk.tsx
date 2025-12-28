import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const hargaTermasukList = [
  "Handling Airport Bandara Indonesia & Arab Saudi",
  "Transportasi Bus Ziarah & City Tour Arab Saudi",
  "Visa Umroh",
  "Tiket Pesawat Pulang - Pergi Internasional",
  "Land Arrangement Akomodasi Sesuai Paket",
  "Full Guide Tour Leader & Muthowif/ah",
  "Makan 3x Full Prasmanan (Non Box)",
  "Air Zamzam 5 Liter",
  "Asuransi Perjalanan",
  "Lounge Keberangkatan",
  "Tiket Domestik",
  "Tasreekh Ziarah Raudho Madinah",
];

function HargaItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <FaCheckCircle className="text-[#003d57] mt-[2px]" />
      <p className="text-[14px]">{text}</p>
    </div>
  );
}

export default function HargaTermasuk() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-8">
      {/* Header */}
      <div 
        className="flex items-center justify-between gap-5 cursor-pointer  rounded-tl-md border-r-[2px] border-[#b1b1b136] pr-3" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-5"> 
          <div className="p-3 bg-[#088842] rounded-tl-md rounded-tr-md text-white">
            <FaCheckCircle />
          </div>
          <p className="font-bold text-[#003d57] ">Harga Termasuk</p>
        </div> 
        {isOpen ? <IoMdArrowDropup size={22} /> : <IoMdArrowDropdown size={22} />}
      </div>
      <div className="border-t-2 border-[#003d57] "></div>

      {/* List */}
      {isOpen && (
        <div className="bg-white p-5 shadow-md">
          {hargaTermasukList.map((item, idx) => (
            <HargaItem key={idx} text={item} />
          ))}
        </div>
      )}
    </div>
  );
}
