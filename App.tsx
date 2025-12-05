import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { CategoriesPage, BooksPage, DigitalBooksPage } from './pages/BookPages';
import { MembersPage } from './pages/MemberPages';
import { LoansPage, ReservationsPage, FinesPage, HistoryPage } from './pages/TransactionPages';
import ReportsPage from './pages/Reports';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f3f4f6]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kategori" element={<CategoriesPage />} />
            <Route path="/buku" element={<BooksPage />} />
            <Route path="/digital" element={<DigitalBooksPage />} />
            <Route path="/anggota" element={<MembersPage />} />
            <Route path="/peminjaman" element={<LoansPage />} />
            <Route path="/reservasi" element={<ReservationsPage />} />
            <Route path="/denda" element={<FinesPage />} />
            <Route path="/riwayat" element={<HistoryPage />} />
            <Route path="/laporan" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;