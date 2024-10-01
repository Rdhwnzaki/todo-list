import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoContext } from '../../context/TodoContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChecklistDetail = () => {
    const { setChecklists } = useContext(TodoContext);
    const { id } = useParams();
    const [checklist, setChecklist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://94.74.86.174:8080/api/checklist/${id}/item`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                setChecklist(response.data);
            } catch (err) {
                console.error('Error fetching checklist:', err);
                setError('Failed to load checklist.');
            } finally {
                setLoading(false);
            }
        };

        fetchChecklist();
    }, [id]);

    const handleDeleteItem = async (itemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://94.74.86.174:8080/api/checklist/${id}/item/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setChecklist((prevChecklist) => ({
                    ...prevChecklist,
                    data: prevChecklist.data.filter(item => item.id !== itemId)
                }));
                toast.success('Item deleted successfully!');
            } catch (error) {
                console.error('Failed to delete item:', error);
                toast.error('Failed to delete item.');
            }
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">{error}</div>;
    }

    if (!checklist) {
        return <div className="container mt-5">Checklist not found</div>;
    }

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>Details</h2>
            <Link to='/checklists'>
                <h6>Back To My Todo</h6>
            </Link>
            {checklist.data.length > 0 ? (
                <ul className="list-group">
                    {checklist.data.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                {item.name} - {item.completed ? 'Completed' : 'Pending'}
                            </div>
                            <div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteItem(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-3">No items found in this checklist.</div>
            )}
            <Link to={`/checklists/${id}/new-item`} className="btn btn-primary mt-3">Add New Item</Link>
        </div>
    );
};

export default ChecklistDetail;
