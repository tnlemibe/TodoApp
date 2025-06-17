import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
                const data = await res.json();
                setTodo(data);
            } catch (error) {
                console.error('Failed to fetch todo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;

    if (!todo?.id) return <div className="p-4">Todo not found</div>;

    return (
        <main className="p-6 max-w-xl mx-auto space-y-6">
            <Button onClick={() => navigate(-1)} variant="outline">
                ← Back
            </Button>

            <h1 className="text-2xl font-bold">Todo Details</h1>

            <div className="border rounded-lg p-4 space-y-2 bg-white shadow">
                <p><strong>ID:</strong> {todo.id}</p>
                <p><strong>Title:</strong> {todo.title}</p>
                <p><strong>Status:</strong> {todo.completed ? '✅ Completed' : '⏳ Incomplete'}</p>
                <p><strong>User ID:</strong> {todo.userId}</p>
            </div>
        </main>
    );
};

export default TodoDetail;

