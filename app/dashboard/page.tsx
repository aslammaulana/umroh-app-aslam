'use client'

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Update tipe data sesuai kolom baru
type Package = {
  id: number;
  slug: string; // Tambahkan ini jika sudah ada di database
  title: string;
  harga: number;
  image: string; // Menggunakan 'image' sesuai update tabel
  maskapai: string;
  durasi: number;
  hotel_rate: number;
  tipe_paket: string;
};

export default function Dashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Gagal mengambil data: ' + error.message);
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus paket ini?')) return;

    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Delete gagal: ' + error.message);
    } else {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data paket...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Umroh</h1>
          <p className="text-gray-500 text-sm">Kelola paket perjalanan umroh Anda</p>
        </div>
        <Link
          href="/dashboard/create"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition-all"
        >
          + Tambah Paket
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-400">Belum ada paket yang dibuat.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Image Section */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={pkg.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {pkg.tipe_paket}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-bold text-lg text-gray-800 line-clamp-1">{pkg.title}</h2>
                  <div className="flex text-yellow-500">
                    {'★'.repeat(pkg.hotel_rate)}
                  </div>
                </div>

                <p className="text-blue-700 font-bold text-xl mb-3">
                  Rp {pkg.harga?.toLocaleString('id-ID')}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <span>✈️</span> {pkg.maskapai || '-'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📅</span> {pkg.durasi || 0} Hari
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 border-t pt-4">
                  {/* Tombol Lihat Baru */}
                  <Link
                    href={`/list-umroh/${pkg.slug || pkg.id}`} // Menggunakan slug jika ada, jika tidak pakai ID
                    className="px-3 py-2 bg-gray-100 hover:bg-green-50 text-green-600 rounded-lg transition-colors flex items-center justify-center"
                    title="Lihat Detail"
                  >
                  Lihat
                  </Link>

                  <Link
                    href={`/dashboard/edit/${pkg.id}`}
                    className="flex-1 text-center py-2 bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="flex-1 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-100 font-medium rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}