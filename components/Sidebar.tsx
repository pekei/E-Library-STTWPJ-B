import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  MonitorPlay, 
  Users, 
  BookUp, 
  CalendarClock, 
  Banknote, 
  History, 
  FileBarChart,
  LogOut,
  Search,
  Command
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [searchValue, setSearchValue] = useState('');

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Kategori', icon: <Library size={20} />, path: '/kategori' },
    { name: 'Data Buku', icon: <BookOpen size={20} />, path: '/buku' },
    { name: 'Buku Digital', icon: <MonitorPlay size={20} />, path: '/digital' },
    { name: 'Anggota', icon: <Users size={20} />, path: '/anggota' },
    { name: 'Peminjaman', icon: <BookUp size={20} />, path: '/peminjaman' },
    { name: 'Reservasi', icon: <CalendarClock size={20} />, path: '/reservasi' },
    { name: 'Denda', icon: <Banknote size={20} />, path: '/denda' },
    { name: 'Riwayat', icon: <History size={20} />, path: '/riwayat' },
    { name: 'Laporan', icon: <FileBarChart size={20} />, path: '/laporan' },
  ];

  const isActive = (p: string) => {
    if (p === '/' && path === '/') return true;
    if (p !== '/' && path.startsWith(p)) return true;
    return false;
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/buku?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  return (
    <div className="w-64 bg-[#1e293b] text-white flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto">
      {/* Header / Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#eab308] rounded-lg flex items-center justify-center text-[#1e293b] font-bold text-xl">
          \\\
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Perpustakaan</h1>
          <p className="text-xs text-slate-400">STT Walter Post Jayapura</p>
        </div>
      </div>

      {/* Search Bar Sidebar */}
      <div className="px-4 mb-4">
        <div className="bg-[#334155] rounded-lg flex items-center px-3 py-2 text-sm group focus-within:ring-2 focus-within:ring-[#eab308]/50 transition-all">
          <Search size={16} className="text-slate-400 mr-2 group-focus-within:text-[#eab308]" />
          <input 
            type="text" 
            placeholder="Cari..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none focus:outline-none text-slate-200 w-full placeholder-slate-400"
          />
          <Command size={14} className="text-slate-500 ml-1" />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-[#eab308] to-[#ca8a04] text-white shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#334155]'
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-[#334155] transition-colors">
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;