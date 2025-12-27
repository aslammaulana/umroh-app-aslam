import Link from 'next/link';
import { FaLocationDot, FaBed } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { TagCardProps } from "@/types"; // Import dari file types
import { FaPlaneDeparture } from 'react-icons/fa';






export default function TagCard({ pkg, hotelMekkah, hotelMadinah }: TagCardProps) {
  return (
    <div>
      <p className="font-bold mb-1">{pkg.title}</p>
      <h3 className="text-[30px] text-[#003d57] font-bold my-3">
        Rp{pkg.harga?.toLocaleString("id-ID")},-
      </h3>

      <div className="mb-6 text-sm">
        <div className="border-b border-[#c7c7c7] py-4 flex justify-start">
          <FaPlaneDeparture className="mr-3.5 text-[#333333] text-[17px]  shrink-0" />
          <div>
            <p className="text-[#666666]">Maskapai</p>
            <p className="font-semibold">{pkg.maskapai || "-"}</p>
          </div>
        </div>
        
        <div className="border-b border-[#c7c7c7] py-4 flex justify-start ">
          <FaLocationDot className="mr-3.5 text-[#333333] text-[17px] shrink-0" />
          <div className='justify-start '>
            <p className="text-[#666666]">Lokasi Keberangkatan</p>
            <p className="font-semibold">{pkg.berangkat_dari || "-"}</p>
          </div>
        </div>

        <div className="border-b border-[#c7c7c7] py-4 flex justify-start">
          <FaBed className="mr-3.5 text-[#333333] text-[17px]  shrink-0" />
          <div>
            <p className="text-[#666666]">Hotel Mekkah</p>
            <p className="font-semibold">{hotelMekkah?.name || "-"}</p>
          </div>
        </div>

        <div className="border-b border-[#c7c7c7] py-4 flex justify-start">
          <FaBed className="mr-3.5 text-[#333333] text-[17px]  shrink-0" />
          <div>
            <p className="text-[#666666]">Hotel Madinah</p>
            <p className="font-semibold">{hotelMadinah?.name || "-"}</p>
          </div>
        </div>
      </div>

      <Link
        href={`https://wa.me/085234567890?text=Halo, saya ingin bertanya tentang paket ${pkg.title}`}
        target="_blank"
        className="flex items-center justify-center gap-2 rounded-md px-6 py-3 text-white font-semibold text-[14px] bg-[#003d57] hover:bg-[#2b5844] transition-colors"
      >
        <IoLogoWhatsapp />
        Hubungi Kami
      </Link>
    </div>
  );
}