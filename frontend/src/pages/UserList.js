import React, { useState, useEffect, useMemo } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../pages/UserForm';
import Navbar from '../components/Navbar';
import * as userService from '../api/userService';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUserClick = () => {
        setEditingUser(null); 
        setIsFormVisible(true); 
    };
    
    const handleFormSubmit = async (userData) => {
        try {
            if (editingUser) {
                await userService.updateUser(editingUser._id, userData);
            } else {
                await userService.createUser(userData);
            }
            setEditingUser(null);
            setIsFormVisible(false); 
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleEdit = (user) => {
        setEditingUser(user);
        setIsFormVisible(true); 
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setIsFormVisible(false); 
    };

    const filteredUsers = useMemo(() => 
        users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ), [users, searchQuery]);

    return (
        <div className="user-list-page">
            <Navbar 
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                onAddUserClick={handleAddUserClick}
            />
            <div className="container">
                {isFormVisible && (
            <UserForm 
                onSubmit={handleFormSubmit} 
                currentUser={editingUser}
                onCancel={handleCancel}
            />
                )}
                <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default UserListPage;
