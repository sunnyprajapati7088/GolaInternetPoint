import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { API } from '../config';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	// Initialize from localStorage if available
	const [user, setUser] = useState(() => {
		try {
			const raw = localStorage.getItem('user');
			return raw ? JSON.parse(raw) : null;
		} catch (e) {
			return null;
		}
	});

	// If a token exists in localStorage, set default axios header
	try {
		const existingToken = localStorage.getItem('authToken');
		if (existingToken) axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
	} catch (e) {
		// ignore
	}

	// Backwards-compatible role-based quick login
	const login = (role) => {
		let userData;
		if (role === 'admin') {
			userData = { name: 'Admin User', role: 'admin' };
		} else if (role === 'franchise') {
			userData = { name: 'Franchise Owner', role: 'franchise', center: 'City Center, Delhi' };
		} else {
			userData = { name: 'Demo Student', role: 'student', id: 'S1001' };
		}
		setUser(userData);
		try { localStorage.setItem('user', JSON.stringify(userData)); } catch (e) { }
		return userData; // Return user to help router navigate
	};

	// Email/password authentication (calls backend)
	const loginWithCredentials = async (email, password) => {
		try {
			const url = `${API}/auth/login`;
			const res = await axios.post(url, { email, password });
			const data = res.data || {};

			// Try to extract token and user
			const token = data.token || data.accessToken || data.authToken || (data.data && (data.data.token || data.data.accessToken));
			const userData = data.user || (data.role ? data : (data.data && data.data.user)) || data;

			if (token) {
				try { localStorage.setItem('authToken', token); } catch (e) { }
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			}

			if (userData) {
				setUser(userData);
				try { localStorage.setItem('user', JSON.stringify(userData)); } catch (e) { }
				return userData;
			}

			return null;
		} catch (err) {
			console.error('Auth API error', err?.response?.data || err.message || err);
			return null;
		}
	};

	const logout = () => {
		setUser(null);
		try { localStorage.removeItem('user'); localStorage.removeItem('authToken'); } catch (e) { }
		try { delete axios.defaults.headers.common['Authorization']; } catch (e) { }
	};

	return (
		<AuthContext.Provider value={{ user, login, loginWithCredentials, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
