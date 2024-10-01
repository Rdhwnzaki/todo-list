import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateChecklist = () => {
    const { addChecklist } = useContext(TodoContext);
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://94.74.86.174:8080/api/checklist', {
                name: name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            addChecklist(response.data);
            toast.success('Checklist created successfully!');
            setName('');
            navigate('/checklists')
        } catch (error) {
            console.error('Error creating checklist:', error);
            toast.error('Failed to create checklist. Please try again.');
        }
    };

    return (
        <div className="container mt-3">
            <ToastContainer />
            <h2>Create New Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateChecklist;
