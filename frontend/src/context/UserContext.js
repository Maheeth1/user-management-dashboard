// frontend/src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as userService from '../api/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getAllUsers()
            .then(response => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users", error);
                setLoading(false);
            });
    }, []);
    
    const removeUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const addUser = (newUser) => {
        // For a more robust app, you'd re-fetch or add the user with the ID from the response
        // For simplicity here, we'll just add it to the state.
        setUsers([...users, newUser]);
    }

    const editUser = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    }


    return (
        <UserContext.Provider value={{ users, loading, removeUser, addUser, editUser }}>
            {children}
        </UserContext.Provider>
    );
};