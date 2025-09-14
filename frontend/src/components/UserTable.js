import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Company</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b whitespace-nowrap">{user.email}</td>
                            <td className="py-2 px-4 border-b whitespace-nowrap">{user.phone}</td>
                            <td className="py-2 px-4 border-b">{user.company}</td>
                            <td className="py-2 px-4 border-b whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
