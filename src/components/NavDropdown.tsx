'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavDropdownProps {
    title: string;
    items: { label: string; href: string }[];
}

export function NavDropdown({ title, items }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="text-1xl font-bold italic tracking-tighter text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 uppercase">
                {title}
                <span className="text-[10px] opacity-70">▼</span>
            </button>

            <div className={`absolute top-full left-0 pt-2 w-48 transition-all duration-200 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <div className="bg-[#121212] border border-white/10 rounded-sm shadow-xl flex flex-col p-1">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-sm transition-colors uppercase tracking-widest text-left"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
