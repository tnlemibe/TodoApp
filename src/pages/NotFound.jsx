
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
        <p className="mb-4">Sorry, the page you are looking for doesn’t exist.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
    </div>
);

export default NotFound;
