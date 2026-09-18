import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { getRegisteredUsers, writeCollection } from '../services/localStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Attempt to load user from localStorage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const registeredUsers = getRegisteredUsers();
                const isLocalSession = localStorage.getItem('token') === 'local-auth-token';
                const isRegistered = registeredUsers.some(registeredUser => registeredUser.email === parsedUser.email);
                if (!isLocalSession || isRegistered) {
                    setUser(parsedUser);
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            } catch {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await api.post('/auth/login', credentials);
            const data = res.data;
            const authenticatedUser = { ...data.user, role: (data.user.role || credentials.role || 'USER').toUpperCase() };
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(authenticatedUser));
            setUser(authenticatedUser);
            return authenticatedUser;
        } catch (error) {
            if (error.response) {
                throw error;
            }
            const registeredUsers = getRegisteredUsers();
            const registeredUser = registeredUsers.find(
                userRecord => userRecord.email === credentials.email && userRecord.password === credentials.password
            );
            if (!registeredUser) {
                throw new Error('Invalid credentials or account is not registered.');
            }

            const authenticatedUser = {
                id: registeredUser.id,
                name: registeredUser.name,
                role: registeredUser.role || 'USER',
                email: registeredUser.email
            };
            localStorage.setItem('token', 'local-auth-token');
            localStorage.setItem('user', JSON.stringify(authenticatedUser));
            setUser(authenticatedUser);
            return authenticatedUser;
        }
    };

    const register = async (userData) => {
        const registeredUsers = getRegisteredUsers();
        if (registeredUsers.some(userRecord => userRecord.email === userData.email)) {
            throw new Error('An account with this email is already registered.');
        }

        try {
            const res = await api.post('/auth/register', userData);
            localStorage.setItem('registeredUsers', JSON.stringify([
                ...registeredUsers,
                { id: res.data?.user?.id || Date.now(), name: userData.name, email: userData.email, password: userData.password, role: userData.role || res.data?.user?.role || 'USER' }
            ]));
            return res.data;
        } catch (error) {
            if (error.response) {
                throw error;
            }
            localStorage.setItem('registeredUsers', JSON.stringify([
                ...registeredUsers,
                { id: Date.now(), name: userData.name, email: userData.email, password: userData.password, role: userData.role || 'USER' }
            ]));
            return { message: 'Registration saved locally until the API is available.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = updates => {
        const nextUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(nextUser));
        writeCollection('registeredUsers', getRegisteredUsers().map(record => record.email === user.email ? { ...record, ...updates } : record));
        setUser(nextUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
