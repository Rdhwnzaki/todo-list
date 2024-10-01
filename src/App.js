import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Checklist from './pages/Checklist';
import CreateChecklist from './pages/CreateChecklist';
import ChecklistDetail from './pages/ChecklistDetail';
import CreateItem from './pages/CreateItem';
import ItemDetail from './pages/ItemDetail';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checklists" element={<Checklist />} />
          <Route path="/checklists/new" element={<CreateChecklist />} />
          <Route path="/checklists/:id" element={<ChecklistDetail />} />
          <Route path="/checklists/:id/new-item" element={<CreateItem />} />
          <Route path="/checklists/:id/item/:itemId" element={<ItemDetail />} />
        </Routes>
      </Router>
    </TodoProvider >
  );
};

export default App;