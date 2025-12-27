import React from "react";
import { FaCheckCircle } from "react-icons/fa";

// 1️⃣ Data harga termasuk
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

// 2️⃣ Component item
function HargaItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <FaCheckCircle className="text-[#003d57] mt-[2px]" />
      <p className="text-[15px]">{text}</p>
    </div>
  );
}

// 3️⃣ Main component
export default function HargaTermasuk() {
  return (
    <div className="mt-8 ">
      {/* Header */}
      <div className="flex items-center gap-5 ">
        <div className="p-3 bg-[#088842] rounded-tl-lg rounded-tr-lg text-white">
          <FaCheckCircle />
        </div>
        <p className="font-bold text-[#088842] text-[16px]">Harga Termasuk</p>
      </div>
      <div className="border-t-2 border-[#003d57] "></div>

      {/* List */}
      <div className="bg-white p-5 shadow-md">
        {hargaTermasukList.map((item, idx) => (
          <HargaItem key={idx} text={item} />
        ))}
      </div>
    </div>
  );
}
