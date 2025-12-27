import { FaBuilding } from 'react-icons/fa'
import { MdBookmarks, MdCall, MdEmail } from 'react-icons/md'

export default function InformasiTravel() {
    return (
        <div>
            <div className="flex flex-col shadow-md border-2 border-[#003d57] text-white p-6 bg-[#003d57] rounded-md">
                <p className="font-bold mb-4">INFORMASI TRAVEL</p>
                {/*  */}
                <div className=" text-sm">
                    <div className=" py-2 flex justify-start items-center">
                        <div className="bg-white rounded-lg mr-3.5 p-3">
                            <FaBuilding className=" text-[#003d57] text-[17px]  " />
                        </div>
                        <div className="flex flex-col justify-start gap-1">
                            <p className="text-[#ffffffc0]">Nama Perusahaan</p>
                            <p className="font-semibold">PT. UMI TOUR & TRAVEL</p>
                        </div>
                    </div>
                </div>
                 {/*  */}
                <div className=" text-sm">
                    <div className=" py-2 flex justify-start items-center">
                        <div className="bg-white rounded-lg mr-3.5 p-3">
                            <MdCall className=" text-[#003d57] text-[17px]  " />
                        </div>
                        <div className="flex flex-col justify-start gap-1">
                            <p className="text-[#ffffffc0]">Nomor Telepon</p>
                            <p className="font-semibold">08118960336</p>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className=" text-sm">
                    <div className=" py-2 flex justify-start items-center">
                        <div className="bg-white rounded-lg mr-3.5 p-3">
                            <MdEmail className=" text-[#003d57] text-[17px]  " />
                        </div>
                        <div className="flex flex-col justify-start gap-1">
                            <p className="text-[#ffffffc0]">Alamat Email</p>
                            <p className="font-semibold">umrah@umi.travel</p>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className=" text-sm">
                    <div className=" py-2 flex justify-start items-center">
                        <div className="bg-white rounded-lg mr-3.5 p-3">
                            <MdBookmarks className=" text-[#003d57] text-[17px]  " />
                        </div>
                        <div className="flex flex-col justify-start gap-1">
                            <p className="text-[#ffffffc0]">Nomor SK Umroh</p>
                            <p className="font-semibold">NOMOR U.298 TAHUN 2020</p>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className=" text-sm">
                    <div className=" py-2 flex justify-start items-center">
                        <div className="bg-white rounded-lg mr-3.5 p-3">
                            <MdBookmarks className=" text-[#003d57] text-[17px]  " />
                        </div>
                        <div className="flex flex-col justify-start gap-1">
                            <p className="text-[#ffffffc0]">Nomor SK Haji</p>
                            <p className="font-semibold">KMA Nomor 433 Tahun 2021</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
