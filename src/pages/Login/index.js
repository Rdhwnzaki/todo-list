import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://94.74.86.174:8080/api/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const data = response.data;
                if (data.data.token) {
                    localStorage.setItem('token', data.data.token);
                    navigate('/checklists');
                }
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
            } else if (error.request) {
                setError('No response from server. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p onClick={() => {
                    navigate('/register')
                }} style={{ cursor: "pointer" }} className='text-primary'>Dont have account? Register</p>
                {error && <p className="text-danger">{error}</p>}
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
