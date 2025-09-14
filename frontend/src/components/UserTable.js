import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-left">Company</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {users.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-4">No users found.</td>
                    </tr>
                ) : (
                    users.map(user => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                            <td className="py-3 px-6 text-left">{user.email}</td>
                            <td className="py-3 px-6 text-left">{user.phone || '-'}</td>
                            <td className="py-3 px-6 text-left">{user.company || '-'}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default UserTable;
