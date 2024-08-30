import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

const SimpleTable = ({ columns, data, onDelete, onInfo }) => {
    return (
        <table className="w-[80%] text-white bg-custom-blue-dark mx-auto rounded-lg overflow-hidden shadow-md">
            <thead className="bg-slate-800">
                <tr>
                    <th className="p-3 text-center align-middle text-sm"></th>
                    {columns.map((column) => (
                        <th key={column.accessor} className="p-5 text-center align-middle text-sm">
                            {column.Header}
                        </th>
                    ))}
                    <th className="p-3 text-center align-middle">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className={`${rowIndex % 2 === 0
                            ? 'bg-custom-blue-lighter'
                            : 'bg-custom-blue-dark'} cursor-pointer hover:bg-custon-blue-dark hover:opacity-80`}
                    >
                        <td className="p-3 border-r border-custom-blue-light text-center align-middle text-lg">
                            {rowIndex + 1}
                        </td>

                        {columns.map((column) => (
                            <td key={column.accessor} className="p-3 text-center align-middle">
                                {row[column.accessor]}
                            </td>
                        ))}
                        
                        <td className="p-3 text-center align-middle">
                            <button
                                className="bg-red-600 text-white p-2 rounded mr-2 hover:bg-red-700"
                                onClick={onDelete} 
                            >
                                <FaTrash />
                            </button>
                            <button
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                onClick={() => onInfo(row)}
                            >
                                <FaEye />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SimpleTable;