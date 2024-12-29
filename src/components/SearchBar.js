'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term); 
    };

    return (
        <input
            type="text"
            placeholder="Buscar posts por título..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 rounded-md border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            style={{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }}
        />
    );
}
