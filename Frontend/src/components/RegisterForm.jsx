import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log("Registered with", { email, password });
            navigate('/login');
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleRegister} className="bg-black p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-6">Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 rounded"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-gray-800 rounded"
                />
                <button type="submit" className="w-full bg-green-500 p-3 rounded">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
