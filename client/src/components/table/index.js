import React from 'react';

const SimpleTable = ({ columns, data }) => {
    return (
        <table className="w-[80%] bg-white mx-auto">
            <thead className="bg-primary text-black">
                <tr>
                    {columns.map((column) => (
                        <th key={column.accessor} className="p-3 border-gray-200 text-center align-middle">
                            {column.Header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                        {columns.map((column) => (
                            <td key={column.accessor} className="p-3 border-b border-gray-200 text-center align-middle">
                                {row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SimpleTable;