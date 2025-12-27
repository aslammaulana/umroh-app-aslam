import { ElementType } from "react";
import { FaBuilding } from "react-icons/fa";
import { MdBookmarks, MdCall, MdEmail } from "react-icons/md";

type InfoItemProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="py-2 flex items-center">
      <div className="bg-white rounded-lg mr-3.5 p-3 shrink-0">
        <Icon className="text-[#003d57] text-[17px]" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[#ffffffc0]">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function InformasiTravel() {
  return (
    <div className="flex flex-col shadow-md border-2 border-[#003d57] text-white p-6 bg-[#003d57] rounded-md">
      <p className="font-bold mb-4">INFORMASI TRAVEL</p>

      <InfoItem
        icon={FaBuilding}
        label="Nama Perusahaan"
        value="PT. UMI TOUR & TRAVEL"
      />

      <InfoItem
        icon={MdCall}
        label="Nomor Telepon"
        value="08118960336"
      />

      <InfoItem
        icon={MdEmail}
        label="Alamat Email"
        value="umrah@umi.travel"
      />

      <InfoItem
        icon={MdBookmarks}
        label="Nomor SK Umroh"
        value="NOMOR U.298 TAHUN 2020"
      />

      <InfoItem
        icon={MdBookmarks}
        label="Nomor SK Haji"
        value="KMA Nomor 433 Tahun 2021"
      />
    </div>
  );
}
