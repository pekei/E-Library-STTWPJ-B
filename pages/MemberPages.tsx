import React, { useState } from 'react';
import { Search, Plus, Filter, Printer, Edit2, Trash2, User, X, Save, AlertTriangle } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  program: string;
  year: number;
  status: 'Aktif' | 'Non-Aktif';
}

export const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: 'STT20240001', name: 'Yohanes Mandowen', email: 'yohanes.m@gmail.com', program: 'Teologi', year: 2024, status: 'Aktif' },
    { id: 'STT20240002', name: 'Maria Tabuni', email: 'maria.t@gmail.com', program: 'Pendidikan Agama Kristen', year: 2024, status: 'Aktif' },
    { id: 'STT20230015', name: 'Petrus Wambrauw', email: 'petrus.w@gmail.com', program: 'Teologi', year: 2023, status: 'Aktif' },
    { id: 'STT20230018', name: 'Sarah Kogoya', email: 'sarah.k@gmail.com', program: 'Musik Gereja', year: 2023, status: 'Aktif' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [printTarget, setPrintTarget] = useState<Member | null>(null);
  
  const initialForm = { id: '', name: '', email: '', program: 'Teologi', year: new Date().getFullYear(), status: 'Aktif' as const };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData({ ...initialForm, id: `STT${new Date().getFullYear()}${Math.floor(Math.random()*10000).toString().padStart(4, '0')}` });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (member: Member) => {
    setFormData(member);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setMembers(members.map(m => m.id === formData.id ? formData : m));
    } else {
      setMembers([...members, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setMembers(members.filter(m => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Data Anggota</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola data anggota perpustakaan</p>
        </div>
        <button 
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/20"
        >
          <Plus size={16} /> Tambah Anggota
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
           <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama, ID, email, atau program studi..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filter Lanjutan
          </button>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID Anggota</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Program Studi</th>
              <th className="px-6 py-4">Angkatan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((member, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-medium text-slate-500 bg-slate-50/50 w-32 rounded-r-lg">{member.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center text-xs font-bold border border-amber-200">
                      <User size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{member.program}</td>
                <td className="px-6 py-4 text-slate-500">{member.year}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${member.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {member.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                        onClick={() => setPrintTarget(member)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" 
                        title="Cetak Kartu"
                    >
                        <Printer size={16} />
                    </button>
                    <button 
                        onClick={() => handleEdit(member)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={() => setDeleteTarget(member)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Add/Edit Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{isEditing ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">ID Anggota</label>
                 <input type="text" value={formData.id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-500 text-sm font-mono" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
                <select 
                   value={formData.program}
                   onChange={e => setFormData({...formData, program: e.target.value})}
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                >
                    <option>Teologi</option>
                    <option>Pendidikan Agama Kristen</option>
                    <option>Musik Gereja</option>
                    <option>Misiologi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Angkatan</label>
                <input 
                  type="number" 
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                />
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Status Keanggotaan</label>
                 <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input type="radio" checked={formData.status === 'Aktif'} onChange={() => setFormData({...formData, status: 'Aktif'})} className="text-amber-500 focus:ring-amber-500" />
                        Aktif
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input type="radio" checked={formData.status === 'Non-Aktif'} onChange={() => setFormData({...formData, status: 'Non-Aktif'})} className="text-amber-500 focus:ring-amber-500" />
                        Non-Aktif
                    </label>
                 </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 flex items-center gap-2"><Save size={16} /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Hapus Anggota?</h3>
            <p className="text-slate-500 text-sm mb-6">Anda yakin ingin menghapus <strong>{deleteTarget.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Print Card Preview */}
      {printTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
                <div className="bg-[#1e293b] p-4 text-white flex justify-between items-center">
                    <span className="font-semibold">Pratinjau Kartu Anggota</span>
                    <button onClick={() => setPrintTarget(null)}><X size={20}/></button>
                </div>
                <div className="p-6">
                    {/* Card Mockup */}
                    <div className="w-full aspect-[1.586] bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl shadow-lg relative overflow-hidden text-white p-4 flex flex-col justify-between">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#eab308] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                         <div className="flex gap-3 items-center z-10">
                            <div className="w-10 h-10 bg-[#eab308] rounded-lg flex items-center justify-center text-[#1e293b] font-bold text-sm">\\\</div>
                            <div>
                                <h3 className="text-xs font-bold leading-tight">PERPUSTAKAAN</h3>
                                <p className="text-[10px] text-slate-300">STT Walter Post Jayapura</p>
                            </div>
                         </div>
                         <div className="z-10 mt-2">
                             <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Nama Anggota</div>
                             <div className="text-lg font-bold truncate">{printTarget.name}</div>
                             <div className="flex justify-between mt-2">
                                 <div>
                                    <div className="text-[10px] text-slate-400 uppercase">ID Anggota</div>
                                    <div className="text-sm font-mono">{printTarget.id}</div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-[10px] text-slate-400 uppercase">Program Studi</div>
                                    <div className="text-sm">{printTarget.program}</div>
                                 </div>
                             </div>
                         </div>
                    </div>
                    <button className="w-full mt-6 py-2 bg-[#1e293b] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-800">
                        <Printer size={16} /> Cetak Sekarang
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};