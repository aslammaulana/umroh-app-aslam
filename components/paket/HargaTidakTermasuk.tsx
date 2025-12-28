import { useState } from "react";
import { IoMdCloseCircle, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const hargaTermasukList = [
  "Pembuatan Paspor",
  "Perlengkapan Ibadah Umroh",
  "Vaksin Meningitis",
];

function HargaItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <IoMdCloseCircle className="text-[#991212] mt-[2px]" />
      <p className="text-[14px]">{text}</p>
    </div>
  );
}

export default function HargaTidakTermasuk() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8">
      {/* Header */}
      <div 
        className="flex items-center justify-between gap-5 cursor-pointer rounded-tl-md border-t-[2px] border-r-[2px] border-[#b1b1b136] pr-3" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-5">
          <div className="p-3 bg-[#991212] rounded-tl-md rounded-tr-md text-white">
            <IoMdCloseCircle />
          </div>
          <p className="font-bold text-[#003d57] ">Harga Tidak Termasuk</p>
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
