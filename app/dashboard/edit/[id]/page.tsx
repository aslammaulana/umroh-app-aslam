'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { hotels } from "@/data/hotels";
import Image from 'next/image';

type ItineraryItem = {
  id?: number;
  day_number: number;
  tanggal: string;
  title: string;
  description: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // States Utama
  const [title, setTitle] = useState('');
  const [harga, setHarga] = useState(0);
  const [deskripsi, setDeskripsi] = useState('');
  const [tipePaket, setTipePaket] = useState('');
  const [maskapai, setMaskapai] = useState('');
  const [berangkatDari, setBerangkatDari] = useState('');
  const [tanggalKeberangkatan, setTanggalKeberangkatan] = useState('');
  const [durasi, setDurasi] = useState(0);
  const [hotelRate, setHotelRate] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [hotelMekkahId, setHotelMekkahId] = useState("");
  const [hotelMadinahId, setHotelMadinahId] = useState("");

  // State Itinerary
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Fetch data paket
        const { data: pkg, error: pkgError } = await supabase
          .from('packages')
          .select('*')
          .eq('id', id)
          .single();

        if (pkgError || !pkg) throw new Error('Paket tidak ditemukan');

        // 2. Fetch data itinerary terkait
        const { data: itin, error: itinError } = await supabase
          .from('itineraries')
          .select('*')
          .eq('package_id', id)
          .order('day_number', { ascending: true });

        if (itinError) console.error(itinError);

        // Isi state
        setTitle(pkg.title || '');
        setHarga(pkg.harga || 0);
        setDeskripsi(pkg.deskripsi || '');
        setTipePaket(pkg.tipe_paket || '');
        setMaskapai(pkg.maskapai || '');
        setBerangkatDari(pkg.berangkat_dari || '');
        setDurasi(pkg.durasi || 0);
        setHotelRate(pkg.hotel_rate || 5);
        setHotelMekkahId(pkg.hotel_mekkah_id || "");
        setHotelMadinahId(pkg.hotel_madinah_id || "");
        setCurrentImageUrl(pkg.image || '');
        setTanggalKeberangkatan(pkg.tanggal_keberangkatan ? pkg.tanggal_keberangkatan.split('T')[0] : '');

        setItineraries(itin || []);
      } catch (err: any) {
        alert(err.message);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, router]);

  const addItineraryDay = () => {
    setItineraries(prev => [
      ...prev,
      {
        day_number: prev.length + 1,
        tanggal: '',
        title: '',
        description: ''
      }
    ]);
  };

  const updateItinerary = (index: number, field: keyof ItineraryItem, value: string | number) => {
    setItineraries(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    let finalImageUrl = currentImageUrl;

    try {
      // 1. Upload Gambar Baru Jika Ada
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('umroh-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        finalImageUrl = supabase.storage
          .from('umroh-images')
          .getPublicUrl(fileName).data.publicUrl;
      }

      // 2. Update Data Table Packages
      const { error: updateError } = await supabase
        .from('packages')
        .update({
          title,
          harga,
          image: finalImageUrl,
          deskripsi,
          tipe_paket: tipePaket,
          maskapai,
          berangkat_dari: berangkatDari,
          tanggal_keberangkatan: tanggalKeberangkatan,
          durasi,
          hotel_rate: hotelRate,
          hotel_mekkah_id: hotelMekkahId || null,
          hotel_madinah_id: hotelMadinahId || null,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // 3. Update Itinerary (Cara termudah: Delete lama, Insert baru)
      const { error: deleteError } = await supabase
        .from('itineraries')
        .delete()
        .eq('package_id', id);

      if (deleteError) throw deleteError;

      for (const item of itineraries) {
        await supabase.from('itineraries').insert([{
          package_id: id,
          day_number: item.day_number,
          tanggal: item.tanggal || null,
          title: item.title,
          description: item.description
        }]);
      }

      alert('Berhasil memperbarui paket!');
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data paket...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Paket Umroh</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Paket */}
        <div>
          <label className="block font-semibold text-sm mb-1">Nama Paket</label>
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Harga (Rp)</label>
            <input
              required
              type="number"
              value={harga}
              onChange={e => setHarga(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Tipe Paket</label>
            <select
              value={tipePaket}
              onChange={e => setTipePaket(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Pilih Tipe</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Plus Turki">Plus Turki</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={e => setDeskripsi(e.target.value)}
            className="border p-2 w-full rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Maskapai</label>
            <input
              value={maskapai}
              onChange={e => setMaskapai(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Berangkat Dari</label>
            <input
              value={berangkatDari}
              onChange={e => setBerangkatDari(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggalKeberangkatan}
              onChange={e => setTanggalKeberangkatan(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Durasi (Hari)</label>
            <input
              type="number"
              value={durasi}
              onChange={e => setDurasi(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Hotel (Bintang)</label>
            <select
              value={hotelRate}
              onChange={e => setHotelRate(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {[1, 2, 3, 4, 5].map(star => (
                <option key={star} value={star}>{star} Bintang</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hotel Selections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Hotel Mekkah</label>
            <select
              required
              value={hotelMekkahId}
              onChange={(e) => setHotelMekkahId(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="">Pilih Hotel Mekkah</option>
              {hotels.filter(h => h.city === "Mekkah").map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Hotel Madinah</label>
            <select
              required
              value={hotelMadinahId}
              onChange={(e) => setHotelMadinahId(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="">Pilih Hotel Madinah</option>
              {hotels.filter(h => h.city === "Madinah").map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="mt-6">
          <p className="font-bold text-[#003d57] mb-2 border-b pb-1">Manajemen Itinerary</p>
          {itineraries.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 border rounded mb-3">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-bold">Hari {item.day_number}</span>
                <input
                  type="date"
                  value={item.tanggal}
                  onChange={e => updateItinerary(index, 'tanggal', e.target.value)}
                  className="border p-1 rounded text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Judul Kegiatan"
                value={item.title}
                onChange={e => updateItinerary(index, 'title', e.target.value)}
                className="border p-2 w-full rounded mb-2 text-sm"
              />
              <textarea
                placeholder="Deskripsi detail kegiatan..."
                value={item.description}
                onChange={e => updateItinerary(index, 'description', e.target.value)}
                className="border p-2 w-full rounded text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            + Tambah Hari
          </button>
        </div>
        {/* Image Preview & Upload Section */}
        <div className="pt-4 border-t mt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            {/* Kolom Kiri: Preview Gambar (Basis 30%) */}
            <div className="w-full md:basis-[20%]">
              <label className="block font-semibold text-sm mb-2 text-gray-700">Gambar Saat Ini</label>
              {currentImageUrl ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg border overflow-hidden">
                  <Image
                    src={currentImageUrl}
                    alt="Current Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain" // Menggunakan contain agar gambar terlihat utuh
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-50 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400 text-xs">
                  Tidak ada gambar
                </div>
              )}
            </div>

            {/* Kolom Kanan: Info & Input (Basis 70%) */}
            <div className="w-full md:basis-[70%] space-y-4">
              <div>
                <label className="block font-semibold text-sm mb-2 text-gray-700">Ganti Gambar (Opsional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 
            file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 
            hover:file:bg-blue-100
            cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2 italic">
                  *Abaikan jika tidak ingin mengganti gambar utama.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={updating}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {updating ? 'Menyimpan...' : 'Update Paket'}
          </button>
        </div>
      </form>
    </div>
  );
}