// frontend/src/pages/UserList.js
import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import the context
import * as userService from '../api/userService'; // Import the service

const UserList = () => {
    const { users, loading, removeUser } = useContext(UserContext); // Consume the context

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            userService.deleteUser(id)
                .then(() => {
                    removeUser(id); // Update state via context function
                })
                .catch(error => console.error("Error deleting user", error));
        }
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <Link to="/add-user" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add User
                </Link>
            </div>
            <div className="overflow-x-auto">
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="w-1/4 py-2 px-4 text-left">Name</th>
                                <th className="w-1/4 py-2 px-4 text-left">Email</th>
                                <th className="w-1/4 py-2 px-4 text-left">Company</th>
                                <th className="w-1/4 py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.company}</td>
                                    <td className="py-2 px-4">
                                        <Link to={`/edit-user/${user.id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;