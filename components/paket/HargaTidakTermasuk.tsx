
import { IoMdCloseCircle } from "react-icons/io";

// 1️⃣ Data harga termasuk
const hargaTermasukList = [
  "Pembuatan Paspor",
"Perlengkapan Ibadah Umroh",
"Vaksin Meningitis",
];

// 2️⃣ Component item
function HargaItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <IoMdCloseCircle className="text-[#991212] mt-[2px]" />
      <p className="text-[15px]">{text}</p>
    </div>
  );
}

// 3️⃣ Main component
export default function HargaTidakTermasuk() {
  return (
    <div className="mt-8 ">
      {/* Header */}
      <div className="flex items-center gap-5 ">
        <div className="p-3 bg-[#991212] rounded-tl-lg rounded-tr-lg text-white">
          <IoMdCloseCircle />
        </div>
        <p className="font-bold text-[#991212] text-[16px]">Harga Termasuk</p>
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
