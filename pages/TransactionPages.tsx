import React from 'react';
import { Search, Plus, RotateCw, CheckCircle, AlertTriangle, Book, FileDown, UploadCloud, XCircle, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, btnText, extraBtn }: { title: string; subtitle: string; btnText?: string, extraBtn?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
    <div className="flex gap-3">
        {extraBtn}
        {btnText && (
            <button className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/20">
                <Plus size={16} /> {btnText}
            </button>
        )}
    </div>
  </div>
);

const SearchBar = ({ placeholder, filters }: { placeholder: string, filters?: boolean }) => (
    <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
            type="text" 
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
        </div>
        {filters && (
           <div className="flex gap-2">
                <select className="px-3 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium focus:outline-none">
                    <option>Semua Status</option>
                </select>
           </div> 
        )}
    </div>
)

// --- Page: Peminjaman ---
export const LoansPage = () => {
    return (
      <div className="p-8">
        <PageHeader title="Peminjaman Buku" subtitle="Kelola transaksi peminjaman buku" btnText="Pinjam Buku" />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <SearchBar placeholder="Cari peminjam, judul buku..." />
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Peminjam</th>
                <th className="px-6 py-4">Buku</th>
                <th className="px-6 py-4">Tgl Pinjam</th>
                <th className="px-6 py-4">Jatuh Tempo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {[
                    { code: 'LN20241115', name: 'Maria Tabuni', book: 'Pengantar Perjanjian Lama', date: '15 Nov 2024', due: '29 Nov 2024', status: 'Terlambat', late: true },
                    { code: 'LN20241120', name: 'Yohanes Mandowen', book: 'Sejarah Gereja Asia', date: '20 Nov 2024', due: '04 Des 2024', status: 'Terlambat', late: true },
                ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-xs bg-slate-50/50">{item.code}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Book size={14} className="text-amber-500"/> {item.book}</td>
                        <td className="px-6 py-4 text-slate-500">{item.date}</td>
                        <td className="px-6 py-4">
                            <span className={item.late ? "text-red-600 font-medium flex items-center gap-1" : ""}>
                                {item.late && <AlertTriangle size={14} />} {item.due}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                             <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100">
                                {item.status}
                             </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2 justify-end">
                                <button className="px-3 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50 flex items-center gap-1">
                                    <RotateCw size={12} />
                                </button>
                                <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-50 flex items-center gap-1">
                                    <CheckCircle size={12} /> Kembalikan
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

// --- Page: Reservasi ---
export const ReservationsPage = () => {
    return (
        <div className="p-8">
            <PageHeader title="Reservasi Buku" subtitle="Kelola reservasi dan antrian peminjaman" btnText="Buat Reservasi" />
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
                <SearchBar placeholder="Cari reservasi..." />
                 <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Kode</th>
                        <th className="px-6 py-4">Anggota</th>
                        <th className="px-6 py-4">Buku</th>
                        <th className="px-6 py-4">Antrian</th>
                        <th className="px-6 py-4">Tgl Reservasi</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Aksi</th>
                    </tr>
                    </thead>
                </table>
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                    Tidak ada data ditemukan
                </div>
            </div>
        </div>
    )
}

// --- Page: Denda ---
export const FinesPage = () => {
    return (
        <div className="p-8">
             <PageHeader 
                title="Manajemen Denda" 
                subtitle="Kelola denda anggota perpustakaan" 
                btnText="Tambah Denda"
                extraBtn={
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                         <FileDown size={16} /> Export
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-center justify-between">
                    <div>
                        <p className="text-red-600 font-medium text-sm mb-1">Total Belum Bayar</p>
                        <h3 className="text-3xl font-bold text-slate-800">Rp 20,000</h3>
                    </div>
                    <div className="p-3 bg-white rounded-full text-red-500 shadow-sm"><AlertTriangle size={24} /></div>
                 </div>
                 <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-emerald-600 font-medium text-sm mb-1">Total Terkumpul</p>
                        <h3 className="text-3xl font-bold text-slate-800">Rp 0</h3>
                    </div>
                    <div className="p-3 bg-white rounded-full text-emerald-500 shadow-sm"><DollarSign size={24} /></div>
                 </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <SearchBar placeholder="Cari kode denda, anggota, buku..." filters={true} />
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Kode</th>
                        <th className="px-6 py-4">Anggota</th>
                        <th className="px-6 py-4">Buku</th>
                        <th className="px-6 py-4">Alasan</th>
                        <th className="px-6 py-4">Jumlah</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-mono text-xs bg-slate-50/50">FN06541799</td>
                            <td className="px-6 py-4 font-medium text-slate-800">Yohanes Mandowen</td>
                            <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">Teologi Sistematika Volume 1</td>
                            <td className="px-6 py-4">
                                <span className="block text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 w-fit rounded mb-1">Lainnya</span>
                                <span className="text-xs text-slate-500">Hilang ganti</span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-red-600">Rp 20,000</td>
                            <td className="px-6 py-4">
                                <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100">
                                    Belum Bayar
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                     <button className="px-3 py-1.5 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-50 flex items-center gap-1">
                                        <CheckCircle size={12} /> Bayar
                                    </button>
                                     <button className="text-slate-400 hover:text-red-500">
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// --- Page: Riwayat ---
export const HistoryPage = () => {
    const history = [
        { code: 'LN20241101', borrower: 'Yohanes Mandowen', book: 'Teologi Sistematika Volume 1', loanDate: '01 Nov 2024', returnDate: '14 Nov 2024', status: 'Dikembalikan', statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { code: 'LN20241115', borrower: 'Maria Tabuni', book: 'Pengantar Perjanjian Lama', loanDate: '15 Nov 2024', returnDate: '-', status: 'Dipinjam', statusClass: 'bg-amber-50 text-amber-600 border-amber-100' },
        { code: 'LN20241120', borrower: 'Yohanes Mandowen', book: 'Sejarah Gereja Asia', loanDate: '20 Nov 2024', returnDate: '-', status: 'Dipinjam', statusClass: 'bg-amber-50 text-amber-600 border-amber-100' },
    ];

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                <h2 className="text-2xl font-bold text-slate-800">Riwayat Peminjaman</h2>
                <p className="text-slate-500 text-sm mt-1">Lihat semua transaksi peminjaman buku</p>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <FileDown size={16} /> Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                     <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari peminjam, judul buku..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        />
                     </div>
                     <div className="flex gap-2">
                        <select className="px-3 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium focus:outline-none">
                            <option>Semua Status</option>
                        </select>
                         <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <Filter size={16} /> Filter Lanjutan
                        </button>
                     </div>
                </div>

                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Kode</th>
                        <th className="px-6 py-4">Peminjam</th>
                        <th className="px-6 py-4">Buku</th>
                        <th className="px-6 py-4">Tgl Pinjam</th>
                        <th className="px-6 py-4">Tgl Kembali</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Denda</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {history.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs bg-slate-50/50">{item.code}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{item.borrower}</td>
                                <td className="px-6 py-4 flex items-center gap-2"><Book size={14} className="text-slate-400"/> {item.book}</td>
                                <td className="px-6 py-4 text-slate-500">{item.loanDate}</td>
                                <td className="px-6 py-4 text-slate-500">{item.returnDate}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${item.statusClass}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}