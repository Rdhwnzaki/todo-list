import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TodoContext } from '../../context/TodoContext';

const ItemDetail = () => {
    const { checklists, updateItemStatus } = useContext(TodoContext);
    const { id, itemId } = useParams();
    const checklist = checklists.find(cl => cl.id === parseInt(id));
    const item = checklist ? checklist.items.find(it => it.id === parseInt(itemId)) : null;

    if (!item) return <div>Item not found</div>;

    const toggleStatus = () => {
        updateItemStatus(parseInt(id), parseInt(itemId), !item.completed);
    };

    return (
        <div className="container mt-5">
            <h2>Item Detail: {item.name}</h2>
            <p>Status: {item.completed ? 'Completed' : 'Pending'}</p>
            <button className="btn btn-success" onClick={toggleStatus}>
                Mark as {item.completed ? 'Pending' : 'Completed'}
            </button>
        </div>
    );
};

export default ItemDetail;
