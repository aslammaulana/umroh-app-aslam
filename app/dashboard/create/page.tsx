'use client';


import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { hotels } from "@/data/hotels";

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState('');
  // Fungsi untuk mengubah Title menjadi format URL-friendly
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '') // Hapus karakter non-alphanumeric kecuali spasi
      .replace(/ +/g, '-');    // Ganti spasi dengan tanda hubung
  };

  // States sesuai kolom database baru
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
  const [hotelMekkahId, setHotelMekkahId] = useState("");
  const [hotelMadinahId, setHotelMadinahId] = useState("");

  const [itineraries, setItineraries] = useState<
    { day_number: number; tanggal: string; title: string; description: string }[]
  >([
    { day_number: 1, tanggal: '', title: '', description: '' } // default 1 hari
  ]);

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


  const updateItinerary = (index: number, field: string, value: string) => {
    setItineraries(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = '';

    try {
      // 1. Upload Gambar
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('umroh-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        image_url = supabase.storage
          .from('umroh-images')
          .getPublicUrl(fileName).data.publicUrl;
      }

      // 2. Insert ke table packages
      const { data: insertedPackage, error: insertError } = await supabase
        .from('packages')
        .insert([{
          title,
          slug, // Tambahkan kolom slug di sini
          harga,
          image: image_url,
          deskripsi,
          tipe_paket: tipePaket,
          maskapai,
          berangkat_dari: berangkatDari,
          tanggal_keberangkatan: tanggalKeberangkatan,
          durasi,
          hotel_rate: hotelRate,
          hotel_mekkah_id: hotelMekkahId || null,
          hotel_madinah_id: hotelMadinahId || null,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      const packageId = insertedPackage.id;

      // 3. Insert itineraries
      for (const item of itineraries) {
        await supabase.from('itineraries').insert([{
          package_id: packageId,
          day_number: item.day_number,
          tanggal: item.tanggal || null,
          title: item.title,
          description: item.description
        }]);
      }


      alert('Paket berhasil dibuat!');
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Paket Umroh Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold text-sm mb-1">Nama Paket</label>
          <input
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value)); // Auto-generate slug
            }}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Contoh: Paket Umroh VIP Ramadhan"
          />
          {/* Preview Slug (Opsional agar admin tahu hasilnya) */}
          <p className="text-xs text-gray-500 mt-1">URL: /list-umroh/{slug}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Harga */}
          <div>
            <label className="block font-semibold text-sm mb-1">Harga (Rp)</label>
            <input
              required
              type="number"
              value={harga}
              onChange={e => setHarga(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Tipe Paket */}
          <div>
            <label className="block font-semibold text-sm mb-1">Tipe Paket</label>
            <select
              value={tipePaket}
              onChange={e => setTipePaket(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Pilih Tipe</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Plus Turki">Plus Turki</option>
            </select>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-semibold text-sm mb-1">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={e => setDeskripsi(e.target.value)}
            className="border p-2 w-full rounded h-24 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Tuliskan detail paket..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Maskapai */}
          <div>
            <label className="block font-semibold text-sm mb-1">Maskapai</label>
            <input
              value={maskapai}
              onChange={e => setMaskapai(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Contoh: Saudi Airlines"
            />
          </div>

          {/* Berangkat Dari */}
          <div>
            <label className="block font-semibold text-sm mb-1">Berangkat Dari</label>
            <input
              value={berangkatDari}
              onChange={e => setBerangkatDari(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Contoh: Jakarta (CGK)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tanggal */}
          <div>
            <label className="block font-semibold text-sm mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggalKeberangkatan}
              onChange={e => setTanggalKeberangkatan(e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Durasi */}
          <div>
            <label className="block font-semibold text-sm mb-1">Durasi (Hari)</label>
            <input
              type="number"
              value={durasi}
              onChange={e => setDurasi(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Hotel Rate */}
          <div>
            <label className="block font-semibold text-sm mb-1">Hotel (Bintang)</label>
            <select
              value={hotelRate}
              onChange={e => setHotelRate(Number(e.target.value))}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500 outline-none"
            >
              {[1, 2, 3, 4, 5].map(star => (
                <option key={star} value={star}>{star} Bintang</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold text-sm mb-1">Gambar Paket</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={e => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">
            Hotel Mekkah
          </label>
          <select
            required
            value={hotelMekkahId}
            onChange={(e) => setHotelMekkahId(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">Pilih Hotel Mekkah</option>
            {hotels
              .filter(h => h.city === "Mekkah")
              .map(h => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">
            Hotel Madinah
          </label>
          <select
            required
            value={hotelMadinahId}
            onChange={(e) => setHotelMadinahId(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">Pilih Hotel Madinah</option>
            {hotels
              .filter(h => h.city === "Madinah")
              .map(h => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-6">
          <p className="font-bold text-[#003d57] mb-2">Itinerary</p>

          {itineraries.map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-md mb-3">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-bold">Hari {item.day_number}</span>
                <input
                  type="date"
                  value={item.tanggal}
                  onChange={e => updateItinerary(index, 'tanggal', e.target.value)}
                  className="border p-1 rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={e => updateItinerary(index, 'title', e.target.value)}
                className="border p-2 w-full rounded mb-2"
              />
              <textarea
                placeholder="Deskripsi"
                value={item.description}
                onChange={e => updateItinerary(index, 'description', e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addItineraryDay}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Tambah Hari
          </button>
        </div>



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
            disabled={loading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:bg-green-300 transition-colors"
          >
            {loading ? 'Menyimpan...' : 'Buat Paket'}
          </button>
        </div>
      </form>
    </div>
  );
}