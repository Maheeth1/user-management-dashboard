import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export const getAllUsers = () => {
    return axios.get(API_URL);
};

export const getUserById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUser = (user) => {
    return axios.post(API_URL, user);
};

export const updateUser = (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};