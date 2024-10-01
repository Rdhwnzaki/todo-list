import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [checklists, setChecklists] = useState([]);

    const removeChecklist = (id) => {
        setChecklists(prevChecklists => prevChecklists.filter(cl => cl.id !== id));
    };

    const addItemToChecklist = (checklistId, newItem) => {
        setChecklists(prevChecklists =>
            prevChecklists.map(cl =>
                cl.id === checklistId
                    ? { ...cl, items: [...cl.items, newItem] }
                    : cl
            )
        );
    };

    const removeItemFromChecklist = (checklistId, itemId) => {
        setChecklists(prevChecklists =>
            prevChecklists.map(cl =>
                cl.id === checklistId
                    ? { ...cl, items: cl.items.filter(item => item.id !== itemId) }
                    : cl
            )
        );
    };

    const updateItemStatus = (checklistId, itemId, completed) => {
        setChecklists(prevChecklists =>
            prevChecklists.map(cl =>
                cl.id === checklistId
                    ? {
                        ...cl,
                        items: cl.items.map(item =>
                            item.id === itemId
                                ? { ...item, completed }
                                : item
                        )
                    }
                    : cl
            )
        );
    };

    return (
        <TodoContext.Provider value={{ checklists, setChecklists, removeChecklist, addItemToChecklist, removeItemFromChecklist, updateItemStatus }}>
            {children}
        </TodoContext.Provider>
    );
};
