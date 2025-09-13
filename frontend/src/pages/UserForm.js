// frontend/src/pages/UserForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        street: '',
        city: '',
        zipcode: '',
    });

    const { id } = useParams(); // Get the 'id' from the URL if it exists
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        // If we are in "edit" mode, fetch the user's data
        if (isEditing) {
            axios.get(`http://localhost:8080/api/users/${id}`)
                .then(response => {
                    setFormData(response.data.data);
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const request = isEditing 
            ? axios.put(`http://localhost:8080/api/users/${id}`, formData)
            : axios.post('http://localhost:8080/api/users', formData);

        request
            .then(() => {
                navigate('/'); // Redirect to the user list on success
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                // Optionally, display an error message to the user
            });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Add New User'}</h2>
            
            {/* Form Fields */}
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
             <div className="mb-4">
                <label className="block text-gray-700">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            {/* Add other fields as needed (street, city, etc.) */}

            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {isEditing ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;