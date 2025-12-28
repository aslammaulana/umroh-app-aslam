import Image from "next/image";
import { Package } from "@/types";
import { FaPrint } from "react-icons/fa";

interface PaketHeroCardProps {
  pkg: Package;
  onDownloadFlyer?: () => void;
}

/* Sub component kecil biar rapi */
function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 bg-[#ffffff] rounded-xs shadow-sm space-y-1 bg-gradient-to-b from-[#ffffff] to-[#f4f5f8]">
      <p className="text-[12px] text-[#0c0c0ca9]">{label}</p>
      <p className="font-bold text-[15px]">{value}</p>
    </div>
  );
}

export default function HeroCard({
  pkg,
  onDownloadFlyer,
}: PaketHeroCardProps) {
  return (
    <div className="rounded-sm shadow-md  flex flex-col ">
      {/* Image */}
      <Image
        src={pkg.image}
        alt={pkg.title}
        width={1200}
        height={400}
        className="w-full h-auto object-contain rounded-md rounded-bl-none rounded-br-none"
        priority
      />

      {/* Grid Info */}
      <div
        className="grid rounded-sm rounded-tl-none rounded-tr-none p-5
  grid-cols-2 gap-5 text-center
  md:grid-cols-4
  bg-gradient-to-b from-[#ffffff] to-[#f4f5f8]"
      >
        <InfoItem label="Durasi" value={`${pkg.durasi} Hari`} />

        <InfoItem label="Maskapai" value={pkg.maskapai} />

        <div className="col-span-2 md:col-span-1">
          <InfoItem
            label="Keberangkatan"
            value={new Date(pkg.tanggal_keberangkatan).toLocaleDateString(
              "id-ID",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <button
            onClick={onDownloadFlyer}
            className="w-full h-full p-3.5 bg-gradient-to-b from-[#1b5b70] to-[#053446] rounded-xs shadow-sm flex items-center justify-center hover:from-[#07465c] hover:to-[#002a3d] transition-colors text-white gap-2"
          >

            <FaPrint />
            <span className="font-bold text-[15px] text-white">
              Download Flyer
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}


