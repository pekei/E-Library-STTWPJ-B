import React from 'react';

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  stock: number;
  totalStock: number;
  location: string;
}

export interface Category {
  code: string;
  name: string;
  description: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  studyProgram: string;
  year: number;
  status: 'Aktif' | 'Non-Aktif';
}

export interface Loan {
  id: string;
  borrowerName: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
  fine?: number;
}

export interface Fine {
  id: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  reason: string;
  amount: number;
  status: 'Belum Bayar' | 'Lunas';
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  textColorClass?: string;
}