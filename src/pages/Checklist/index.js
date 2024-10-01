import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checklist = () => {
    const { checklists, setChecklists, removeChecklist } = useContext(TodoContext);
    const navigate = useNavigate();
    const baseURL = 'http://94.74.86.174:8080/api/checklist';

    useEffect(() => {
        const fetchChecklists = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${baseURL}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data && Array.isArray(response.data.data)) {
                        setChecklists(response.data.data);
                    } else {
                        console.error('Unexpected response structure:', response.data);
                    }
                }
            } catch (error) {
                toast.error('Error fetching Todo-list:', error);
            }
        };

        fetchChecklists();
    }, [setChecklists]);

    const handleRemoveChecklist = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this checklist?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete(`${baseURL}/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    removeChecklist(id);
                    toast.success('Todo-list deleted successfully!');
                }
            } catch (error) {
                toast.error('Failed to delete Todo-list.');
            }
        }
    };

    const updateItemStatus = async (checklistId, itemId, itemCompletionStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.put(`${baseURL}/${checklistId}/item/${itemId}`, { itemCompletionStatus }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);


                if (response.status === 200) {
                    setChecklists(prevChecklists =>
                        prevChecklists.map(cl =>
                            cl.id === checklistId
                                ? { ...cl, items: cl.items.map(item => item.id === itemId ? { ...item, itemCompletionStatus } : item) }
                                : cl
                        )
                    );
                    toast.success('Item status updated successfully!');
                }
            }
        } catch (error) {
            toast.error('Failed to update item status.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>My Todo-List</h2>
            <p style={{ cursor: "pointer" }} className='text-primary' onClick={() => navigate('/checklists/new')}>Create new</p>
            <ul className="list-group">
                {checklists.length > 0 ? (
                    checklists.map(cl => (
                        <li key={cl.id} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <Link to={`/checklists/${cl.id}`}>{cl.name}</Link>
                                <button className="btn btn-danger" onClick={() => handleRemoveChecklist(cl.id)}>Delete</button>
                            </div>
                            {cl.items && cl.items.length > 0 ? (
                                <ul className="list-group mt-2">
                                    {cl.items.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                                            <span>
                                                {item.name} - {item.itemCompletionStatus ? 'Completed' : 'Pending'}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={item.itemCompletionStatus}
                                                onChange={() => updateItemStatus(cl.id, item.id, !item.itemCompletionStatus)}
                                                className="form-check-input me-2"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="mt-2">No items found in this checklist.</div>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">Tidak ada data</li>
                )}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default Checklist;
