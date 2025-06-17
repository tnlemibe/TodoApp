import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

const App = () => {
  return (
    <BrowserRouter>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">React Todo App</h1>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;

