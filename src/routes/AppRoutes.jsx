import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TodoDetail from '../pages/TodoDetail';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
