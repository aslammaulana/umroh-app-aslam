import Image from "next/image";
import { Package } from "@/types";

interface PaketHeroCardProps {
  pkg: Package;
  onDownloadFlyer?: () => void;
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
      <div className="grid rounded-sm rounded-tl-none rounded-tr-none p-5 grid-cols-2 md:grid-cols-4 gap-5 text-center bg-gradient-to-b from-[#ffffff] to-[#f4f5f8]">
        <InfoItem label="Durasi" value={`${pkg.durasi} Hari`} />
        <InfoItem label="Maskapai" value={pkg.maskapai} />
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

        <button
          onClick={onDownloadFlyer}
          className="p-2 bg-gradient-to-b from-[#1b5b70] to-[#053446] rounded-md shadow-sm flex items-center justify-center hover:from-[#07465c] hover:to-[#002a3d] transition-colors"
        >
          <span className="font-bold text-[15px] text-white">
            Download Flyer
          </span>
        </button>
      </div>
    </div>
  );
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
    <div className="p-3 bg-[#ffffff] rounded-md shadow-sm space-y-1 bg-gradient-to-b from-[#ffffff] to-[#f4f5f8]">
      <p className="text-[12px] text-[#0c0c0ca9]">{label}</p>
      <p className="font-bold text-[15px]">{value}</p>
    </div>
  );
}
