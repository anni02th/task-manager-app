// src/components/Login.jsx

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            onLogin(username);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;