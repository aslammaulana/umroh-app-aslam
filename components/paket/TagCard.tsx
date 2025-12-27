import Link from "next/link";
import Image from "next/image";
import { FaLocationDot, FaBed } from "react-icons/fa6";
import { FaHeadset, FaPlaneDeparture } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { TagCardProps } from "@/types";
import { ElementType } from "react";

type InfoRowProps = {
  icon: ElementType;
  label: string;
  value?: string;
};

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="border-b border-[#c7c7c796] py-4 flex justify-start">
      <Icon className="mr-3.5 text-[#333333] mt-0.5 text-[17px] shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="text-[#666666]">{label}</p>
        <p className="font-semibold">{value || "-"}</p>
      </div>
    </div>
  );
}


export default function TagCard({ pkg, hotelMekkah, hotelMadinah }: TagCardProps) {
  return (
    <div className="flex flex-col shadow-md bg-white rounded-md ">
      <div className="relative text-white overflow-hidden rounded-sm rounded-bl-none rounded-br-none ">
        <div className="absolute inset-0">
          <Image
            src="/NawayaAssets/titlehero.jpg"
            alt="hero image"
            fill
            className="object-cover object-top-right"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b5b70e7] to-[#053446f6]"></div>
        </div>

        <div className="relative flex items-center justify-center px-6 py-10">
          <p className="text-[20px] font-extrabold leading-snug ">
            {pkg.title}
          </p>
        </div>
      </div>

      <div className="relative p-6">
        <div className="absolute inset-x-0 bottom-0 rounded-md h-1/2 bg-gradient-to-b from-[#ffffff] to-[#f4f5f8] pointer-events-none"></div>

        <div className="relative">
          <h3 className="text-[30px] text-[#003d57] font-extrabold mb-2">
            Rp{pkg.harga?.toLocaleString("id-ID")},-
          </h3>

          <div className="mb-6">
            <InfoRow
              icon={FaPlaneDeparture}
              label="Maskapai"
              value={pkg.maskapai}
            />

            <InfoRow
              icon={FaLocationDot}
              label="Lokasi Keberangkatan"
              value={pkg.berangkat_dari}
            />

            <InfoRow
              icon={FaBed}
              label="Hotel Mekkah"
              value={hotelMekkah?.name}
            />

            <InfoRow
              icon={FaBed}
              label="Hotel Madinah"
              value={hotelMadinah?.name}
            />
          </div>

          <Link
            href={`https://wa.me/085234567890?text=Halo, saya ingin bertanya tentang paket ${pkg.title}`}
            target="_blank"
            className="p-4 bg-gradient-to-b from-[#1b5b70] to-[#053446] rounded-md shadow-sm flex items-center justify-center hover:from-[#07465c] hover:to-[#002a3d] transition-colors text-white gap-2 font-bold text-[15px]"
          >
            <FaHeadset />
            Hubungi Kami
          </Link>
        </div>
      </div>

    </div>
  );
}
