import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://94.74.86.174:8080/api/register', {
                email: email,
                password: password,
                username: username,
            });

            if (response.status === 200) {
                setSuccess('Registered successfully!');
                setEmail('');
                setPassword('');
                setUsername('');
                navigate('/')
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.errorMessage || 'Registration failed');
            } else if (error.request) {
                setError('No response from server. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
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
                    navigate('/')
                }} style={{ cursor: "pointer" }} className='text-primary'>Have an account? Login</p>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
