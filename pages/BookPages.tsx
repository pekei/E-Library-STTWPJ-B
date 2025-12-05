import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, UploadCloud, FileText, Eye, Download, X, Save, AlertCircle, BookOpen, MapPin, BarChart3, AlertTriangle, CheckCircle2, MoreVertical } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// --- Components Helpers ---
const ActionButtons = ({ onEdit, onDelete }: { onEdit?: () => void, onDelete?: () => void }) => (
  <div className="flex gap-2 justify-center">
    <button 
      onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    >
      <Edit2 size={16} />
    </button>
    <button 
      onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 size={16} />
    </button>
  </div>
);

const PageHeader = ({ title, subtitle, btnText, onBtnClick, secondaryAction }: { title: string; subtitle: string; btnText: string; onBtnClick?: () => void; secondaryAction?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
    <div className="flex gap-3">
      {secondaryAction}
      <button 
        onClick={onBtnClick}
        className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/20"
      >
        <Plus size={16} /> {btnText}
      </button>
    </div>
  </div>
);

// --- Page: Kategori ---
interface Category {
  code: string;
  name: string;
  desc: string;
}

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    { code: 'TEOL', name: 'Teologi Sistematika', desc: 'Buku-buku teologi sistematika dan dogmatika' },
    { code: 'ALK', name: 'Alkitab & Eksegese', desc: 'Tafsiran Alkitab dan studi eksegese' },
    { code: 'SG', name: 'Sejarah Gereja', desc: 'Sejarah perkembangan gereja dari masa ke masa' },
    { code: 'PM', name: 'Pelayanan & Misi', desc: 'Buku tentang pelayanan gereja dan misi' },
    { code: 'PAK', name: 'Pastoral & Konseling', desc: 'Konseling pastoral dan pembinaan jemaat' },
    { code: 'REF', name: 'Umum & Referensi', desc: 'Buku referensi umum, kamus, dan ensiklopedia' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  
  const initialForm = { code: '', name: '', desc: '' };
  const [formData, setFormData] = useState(initialForm);
  const [editingCode, setEditingCode] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (cat: Category) => {
    setFormData(cat);
    setEditingCode(cat.code);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) return; // Simple validation

    if (isEditing && editingCode) {
      setCategories(categories.map(c => c.code === editingCode ? formData : c));
    } else {
      setCategories([...categories, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setCategories(categories.filter(c => c.code !== deleteTarget.code));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="p-8">
      <PageHeader 
        title="Kategori Buku" 
        subtitle="Kelola kategori koleksi buku perpustakaan" 
        btnText="Tambah Kategori" 
        onBtnClick={handleOpenAdd}
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
           <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari kategori..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 w-24">Kode</th>
              <th className="px-6 py-4 w-1/4">Nama Kategori</th>
              <th className="px-6 py-4">Deskripsi</th>
              <th className="px-6 py-4 w-24 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-slate-100 font-mono text-xs font-bold text-slate-600">{cat.code}</span></td>
                <td className="px-6 py-4 font-medium text-slate-800">{cat.name}</td>
                <td className="px-6 py-4 text-slate-500">{cat.desc}</td>
                <td className="px-6 py-4 text-center">
                  <ActionButtons 
                    onEdit={() => handleEdit(cat)}
                    onDelete={() => setDeleteTarget(cat)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{isEditing ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kode Kategori</label>
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={e => setFormData({...formData, code: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                  placeholder="Contoh: TEOL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kategori</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                  placeholder="Contoh: Teologi Sistematika"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea 
                  value={formData.desc}
                  onChange={e => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm h-24 resize-none"
                  placeholder="Deskripsi singkat..."
                />
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
            <h3 className="text-lg font-bold text-slate-800 mb-2">Hapus Kategori?</h3>
            <p className="text-slate-500 text-sm mb-6">Anda yakin ingin menghapus kategori <strong>{deleteTarget.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Page: Data Buku ---

interface BookData {
  isbn: string;
  title: string;
  author: string;
  category: string;
  stock: number;
  total: number;
  loc: string;
}

interface FormErrors {
  [key: string]: string;
}

export const BooksPage = () => {
  const [searchParams] = useSearchParams();
  
  // State
  const [books, setBooks] = useState<BookData[]>([
    { isbn: '978-602-123-001-1', title: 'Teologi Sistematika Volume 1', author: 'Louis Berkhof', category: 'Teologi Sistematika', stock: 3, total: 5, loc: 'Rak A-01' },
    { isbn: '978-602-123-002-2', title: 'Pengantar Perjanjian Lama', author: 'Tremper Longman III', category: 'Alkitab & Eksegese', stock: 4, total: 4, loc: 'Rak B-02' },
    { isbn: '978-602-123-003-3', title: 'Sejarah Gereja Asia', author: 'John C. England', category: 'Sejarah Gereja', stock: 2, total: 3, loc: 'Rak C-01' },
    { isbn: '978-602-123-004-4', title: 'Misi dan Evangelism', author: 'David J. Bosch', category: 'Pelayanan & Misi', stock: 5, total: 6, loc: 'Rak D-03' },
    { isbn: '978-602-123-005-5', title: 'Konseling Pastoral', author: 'Gary R. Collins', category: 'Pastoral & Konseling', stock: 3, total: 4, loc: 'Rak E-02' },
    { isbn: '978-602-123-006-6', title: 'Alkitab Edisi Studi', author: 'Lembaga Alkitab Indonesia', category: 'Umum & Referensi', stock: 8, total: 10, loc: 'Rak A-05' },
    { isbn: '978-602-123-007-7', title: 'Hermeneutika Alkitab', author: 'Grant R. Osborne', category: 'Alkitab & Eksegese', stock: 2, total: 3, loc: 'Rak B-04' },
  ]);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low', 'in_stock'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIsbn, setEditingIsbn] = useState<string | null>(null);

  // Update search query when URL param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);
  
  // Form State
  const initialFormState = { isbn: '', title: '', author: '', category: '', stock: 0, total: 0, loc: '' };
  const [formData, setFormData] = useState<BookData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  // Constants
  const categoriesList = ['Teologi Sistematika', 'Alkitab & Eksegese', 'Sejarah Gereja', 'Pelayanan & Misi', 'Pastoral & Konseling', 'Umum & Referensi'];

  // --- Handlers ---

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value);
  
  const handleStockFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStockFilter(e.target.value);

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditingIsbn(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (book: BookData) => {
    setFormData(book);
    setIsEditing(true);
    setEditingIsbn(book.isbn);
    setErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.isbn) newErrors.isbn = 'ISBN wajib diisi';
    else if (!/^[0-9-]{10,}$/.test(formData.isbn)) newErrors.isbn = 'Format ISBN tidak valid (min 10 digit/dash)';
    
    if (!formData.title) newErrors.title = 'Judul buku wajib diisi';
    if (!formData.author) newErrors.author = 'Penulis wajib diisi';
    if (!formData.category) newErrors.category = 'Pilih kategori';
    if (formData.total < 1) newErrors.total = 'Total buku harus > 0';
    if (formData.stock < 0) newErrors.stock = 'Stok tidak boleh negatif';
    if (formData.stock > formData.total) newErrors.stock = 'Stok tidak boleh melebihi total';
    if (!formData.loc) newErrors.loc = 'Lokasi rak wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditing && editingIsbn) {
        setBooks(books.map(b => b.isbn === editingIsbn ? formData : b));
      } else {
        setBooks([formData, ...books]);
      }
      setIsModalOpen(false);
      setFormData(initialFormState);
      setErrors({});
    }
  };

  const handleDeleteConfirm = () => {
    if (bookToDelete) {
      setBooks(books.filter(b => b.isbn !== bookToDelete.isbn));
      setBookToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const headers = "ISBN,Judul,Penulis,Kategori,Stok,Total,Lokasi";
    const rows = filteredBooks.map(b => `${b.isbn},"${b.title}","${b.author}",${b.category},${b.stock},${b.total},${b.loc}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_buku_perpustakaan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery);
      
      const matchesCategory = categoryFilter === 'Semua Kategori' || book.category === categoryFilter;

      const matchesStock = 
        stockFilter === 'all' ? true :
        stockFilter === 'low' ? book.stock <= 2 :
        book.stock > 2;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [books, searchQuery, categoryFilter, stockFilter]);

  return (
    <div className="p-8 relative">
      <PageHeader 
        title="Data Buku" 
        subtitle="Kelola koleksi buku perpustakaan" 
        btnText="Tambah Buku"
        onBtnClick={handleOpenAdd}
        secondaryAction={
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Ekspor
          </button>
        }
      />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col xl:flex-row gap-4 justify-between items-center">
           <div className="flex-1 flex flex-col md:flex-row gap-3 w-full">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Cari judul, penulis, ISBN..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                   <select 
                      value={categoryFilter}
                      onChange={handleCategoryChange}
                      className="h-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:border-amber-500 cursor-pointer appearance-none"
                   >
                      <option>Semua Kategori</option>
                      {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                   </select>
                   <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                   <select 
                      value={stockFilter}
                      onChange={handleStockFilterChange}
                      className="h-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:border-amber-500 cursor-pointer appearance-none"
                   >
                      <option value="all">Semua Status Stok</option>
                      <option value="low">Stok Menipis (≤2)</option>
                      <option value="in_stock">Stok Tersedia ({'>'}2)</option>
                   </select>
                   <BarChart3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
           </div>
        </div>

        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ISBN</th>
              <th className="px-6 py-4">Judul Buku</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-center">Stok</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => setSelectedBook(book)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-slate-700">{book.isbn}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{book.title}</div>
                        <div className="text-xs text-slate-500">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">{book.category}</span></td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      book.stock <= 2 
                        ? "bg-red-100 text-red-600 border border-red-200" 
                        : "bg-emerald-100 text-emerald-600 border border-emerald-200"
                    }`}>
                      {book.stock}
                    </span>
                    <span className="text-slate-400 text-xs ml-1">/{book.total}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{book.loc}</td>
                  <td className="px-6 py-4 text-center">
                    <ActionButtons 
                      onEdit={() => handleEdit(book)}
                      onDelete={() => setBookToDelete(book)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Search size={32} className="opacity-20" />
                    <p>Tidak ada buku yang ditemukan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedBook(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#1e293b] p-6 text-white relative">
              <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={40} className="text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight mb-1">{selectedBook.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{selectedBook.author}</p>
                  <span className="inline-block bg-[#eab308] text-[#1e293b] text-xs font-bold px-2 py-0.5 rounded">
                    {selectedBook.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ISBN</p>
                  <p className="text-sm font-mono text-slate-700">{selectedBook.isbn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lokasi Rak</p>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <MapPin size={14} className="text-amber-500" />
                    {selectedBook.loc}
                  </div>
                </div>
                <div className="col-span-2 space-y-1 mt-2">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ketersediaan</p>
                    <p className="text-sm font-medium text-slate-700">
                      <span className={selectedBook.stock <= 2 ? "text-red-600" : "text-emerald-600"}>{selectedBook.stock}</span> 
                      <span className="text-slate-400"> dari {selectedBook.total} buku</span>
                    </p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${selectedBook.stock <= 2 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${(selectedBook.stock / selectedBook.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {bookToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Hapus Buku?</h3>
            <p className="text-slate-500 mb-6">
              Apakah Anda yakin ingin menghapus buku <br/>
              <span className="font-semibold text-slate-700">"{bookToDelete.title}"</span>?
              <br/>Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setBookToDelete(null)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ISBN */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">ISBN</label>
                <input 
                  type="text" 
                  value={formData.isbn}
                  onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.isbn ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Contoh: 978-602-..."
                />
                {errors.isbn && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.isbn}</p>}
              </div>

              {/* Kategori */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.category ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Pilih Kategori</option>
                  {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.category}</p>}
              </div>

              {/* Judul */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Buku</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.title ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Masukkan judul buku"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.title}</p>}
              </div>

              {/* Penulis */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Penulis</label>
                <input 
                  type="text" 
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.author ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Nama penulis"
                />
                {errors.author && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.author}</p>}
              </div>

               {/* Stok & Total */}
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total</label>
                    <input 
                      type="number" 
                      min="1"
                      value={formData.total}
                      onChange={(e) => setFormData({...formData, total: parseInt(e.target.value) || 0})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.total ? 'border-red-500' : 'border-slate-300'}`}
                    />
                     {errors.total && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.total}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Stok Tersedia</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.stock ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.stock && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.stock}</p>}
                  </div>
               </div>

               {/* Lokasi */}
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi Rak</label>
                  <input 
                    type="text" 
                    value={formData.loc}
                    onChange={(e) => setFormData({...formData, loc: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm ${errors.loc ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder="Contoh: Rak A-01"
                  />
                  {errors.loc && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.loc}</p>}
               </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Save size={16} /> Simpan Buku
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Page: Buku Digital ---
export const DigitalBooksPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Koleksi Digital</h2>
          <p className="text-slate-500 text-sm mt-1">Kelola buku digital (PDF/EPUB)</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/20"
        >
          <UploadCloud size={16} /> Upload Buku Digital
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><FileText size={24} /></div>
          <div><h3 className="text-2xl font-bold text-slate-800">0</h3><p className="text-sm text-slate-500">Buku Digital</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Download size={24} /></div>
          <div><h3 className="text-2xl font-bold text-slate-800">0</h3><p className="text-sm text-slate-500">Total Unduhan</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Eye size={24} /></div>
          <div><h3 className="text-2xl font-bold text-slate-800">0</h3><p className="text-sm text-slate-500">Akses Aktif</p></div>
        </div>
      </div>

      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Cari buku digital..." 
          className="w-full md:w-1/3 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
          <FileText size={32} />
        </div>
        <h3 className="text-lg font-medium text-slate-600 mb-1">Belum ada buku digital</h3>
        <p className="text-slate-400 text-sm mb-6 max-w-xs">Mulai dengan mengunggah file PDF atau EPUB ke koleksi digital.</p>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Upload Buku Digital Pertama
        </button>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Upload Buku Digital</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-amber-500 hover:bg-amber-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 group-hover:text-amber-500">
                   <UploadCloud size={24} />
                </div>
                <p className="text-sm font-medium text-slate-700">Klik untuk upload atau drag & drop</p>
                <p className="text-xs text-slate-400 mt-1">PDF, EPUB (Maks. 50MB)</p>
              </div>
              <div className="mt-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Judul Buku</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm" placeholder="Masukkan judul..." />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan (Opsional)</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm" placeholder="Versi, edisi, dll..." />
                 </div>
              </div>
            </div>
             <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Batal</button>
              <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 flex items-center gap-2"><UploadCloud size={16} /> Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};