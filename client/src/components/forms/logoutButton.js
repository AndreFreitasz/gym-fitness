import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Button from '../forms/button.js';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout realizado com sucesso");
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Button
            colorClass="bg-red-500 hover:bg-red-600" 
            className="px-6 flex justify-center items-center" 
            onClick={handleLogout}
        > 
            <FaSignOutAlt className="mr-2" /> Sair
        </Button>
    );
};

export default LogoutButton;