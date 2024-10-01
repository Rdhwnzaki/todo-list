import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateItem = () => {
    const { addItemToChecklist } = useContext(TodoContext);
    const [itemName, setItemName] = useState('');
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { itemName: itemName };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://94.74.86.174:8080/api/checklist/${id}/item`, newItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            addItemToChecklist(parseInt(id), response.data.data);
            setItemName('');
            setSuccess(true);
            setError(null);
            setTimeout(() => {
                navigate(`/checklists/${id}`)
            }, 2000)
        } catch (err) {
            console.error('Error adding item:', err);
            setError('Failed to add item. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add New Item</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Item added successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default CreateItem;
