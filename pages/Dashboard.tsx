import React from 'react';
import { Book, Users, BookOpenCheck, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h2>
        <p className="text-slate-500">Selamat datang di Sistem Perpustakaan STT Walter Post Jayapura</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Koleksi Buku" 
          value="35" 
          icon={<Book size={24} />} 
          bgIconColor="bg-blue-500"
        />
        <StatCard 
          title="Anggota Aktif" 
          value="4" 
          icon={<Users size={24} />} 
          bgIconColor="bg-emerald-500"
        />
        <StatCard 
          title="Sedang Dipinjam" 
          value="2" 
          icon={<BookOpenCheck size={24} />} 
          bgIconColor="bg-amber-500"
        />
        <StatCard 
          title="Terlambat" 
          value="2" 
          icon={<AlertCircle size={24} />} 
          bgIconColor="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Loans */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <BookOpenCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Peminjaman Terbaru</h3>
          </div>
          
          <div className="space-y-4">
            {[
              {
                title: "Teologi Sistematika Volume 1",
                borrower: "Yohanes Mandowen",
                date: "01 Nov 2024",
                status: "Dikembalikan",
                statusClass: "bg-green-100 text-green-700"
              },
              {
                title: "Pengantar Perjanjian Lama",
                borrower: "Maria Tabuni",
                date: "15 Nov 2024",
                status: "Dipinjam",
                statusClass: "bg-amber-100 text-amber-700"
              },
              {
                title: "Sejarah Gereja Asia",
                borrower: "Yohanes Mandowen",
                date: "20 Nov 2024",
                status: "Dipinjam",
                statusClass: "bg-amber-100 text-amber-700"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.borrower}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md ${item.statusClass}`}>
                    {item.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Buku Populer</h3>
          </div>

          <div className="space-y-4">
            {[
              { title: "Teologi Sistematika Volume 1", author: "Louis Berkhof", count: 1 },
              { title: "Pengantar Perjanjian Lama", author: "Tremper Longman III", count: 1 },
              { title: "Sejarah Gereja Asia", author: "John C. England", count: 1 },
              { title: "Misi dan Evangelism", author: "David J. Bosch", count: 0 },
              { title: "Konseling Pastoral", author: "Gary R. Collins", count: 0 },
            ].map((book, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">{book.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{book.author}</p>
                </div>
                <div className="text-xs font-medium text-slate-600">
                  {book.count} <span className="text-slate-400 font-normal">pinjaman</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;