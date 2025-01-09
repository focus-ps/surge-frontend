'use client';
import { useState } from 'react';
import Navbar from './ui/Navbar';
import SearchInput from './ui/SearchInput';

const dummyData = [
  { id: 1, name: 'Contact 1', details: 'Details for Contact 1' },
  { id: 2, name: 'Contact 2', details: 'Details for Contact 2' },
  { id: 3, name: 'Contact 3', details: 'Details for Contact 3' },
  { id: 4, name: 'Contact 4', details: 'Details for Contact 4' },
  // Add more dummy data as needed
];

export function DualView() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-3 flex flex-row-">
        <div className="w-[50%] mx-auto px-4">
          <SearchInput />
        </div>
        <div className="w-[50%] mx-auto px-4">
          <SearchInput />
        </div>
      </main>
    </div>
  );
}

export default DualView;
