import React from 'react';
import { useLocation } from 'react-router-dom';

function NavItem({ href, label }) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <li className="relative group">
            <a
                href={href}
                className="hover:border-red-500 text-lg cursor-pointer transition duration-500 font-semibold"
            >
                {label}
                <div className={`absolute bottom-[-10px] rounded-b-md left-0 w-full h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}></div>
            </a>
        </li>
    );
}

export default NavItem;