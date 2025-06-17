import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import CreateOrEditTodoModal from '../components/CreateOrEditTodoModal';
import { db } from '../db/indexedDb';

const TODOS_PER_PAGE = 10;

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await res.json();
                await db.todos.clear();
                await db.todos.bulkAdd(data);
                setTodos(data);
            } catch (err) {
                const cached = await db.todos.toArray();
                setTodos(cached);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    useEffect(() => {
        const update = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return () => {
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);




    const handleCreate = async (newTodo) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({ ...newTodo, userId: 1 }),
            headers: { 'Content-Type': 'application/json' },
        });

        const created = await res.json();

        const maxId = Math.max(...todos.map(t => t.id), 0);
        const todoWithId = { ...created, id: maxId + 1 };
        const localTodo = { ...newTodo, id: maxId + 1, userId: 1 };

        await db.todos.add(localTodo);
        setTodos(prev => [todoWithId, ...prev]);
    };


    const handleEdit = async (updated) => {
        if (!updated?.id) {
            console.warn('Trying to edit a todo without an id:', updated);
            return;
        }

        await fetch(`https://jsonplaceholder.typicode.com/todos/${updated.id}`, {
            method: 'PUT',
            body: JSON.stringify(updated),
            headers: { 'Content-Type': 'application/json' },
        });

        await db.todos.put(updated);
        setTodos(prev =>
            prev.map(todo => (todo.id === updated.id ? updated : todo))
        );
    };


    const handleDelete = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });
        await db.todos.delete(id);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            status === 'all' ||
            (status === 'complete' && todo.completed) ||
            (status === 'incomplete' && !todo.completed);
        return matchesSearch && matchesStatus;
    });

    const startIndex = (page - 1) * TODOS_PER_PAGE;
    const currentTodos = filteredTodos.slice(startIndex, startIndex + TODOS_PER_PAGE);
    const totalPages = Math.ceil(filteredTodos.length / TODOS_PER_PAGE);

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Todos</h1>
                <Button onClick={() => setShowCreateModal(true)}>Add Todo</Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-4 py-2 w-full sm:w-1/2"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-4 py-2 w-full sm:w-1/4"
                >
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul className="space-y-2">
                        {currentTodos.map((todo) => (
                            <li key={todo.id} className="p-4 border rounded shadow flex justify-between items-center">
                                <div>
                                    <Link to={`/todos/${todo.id}`} className="font-medium text-blue-600">
                                        {todo.title}
                                    </Link>
                                    <p className="text-sm text-gray-500">{todo.completed ? '✅ Completed' : '❌ Not completed'}</p>
                                </div>
                                <div className="space-x-2">
                                    <Button size="sm" className="bg-green-400" onClick={() => setEditTodo(todo)}>Edit</Button>
                                    <Button size="sm" className="bg-red-400" variant="destructive" onClick={() => handleDelete(todo.id)}>Delete</Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center">
                        <Button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="disabled:opacity-50"
                        >
                            Prev
                        </Button>
                        <span>Page {page} of {totalPages}</span>
                        <Button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="disabled:opacity-50"
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}

            {showCreateModal && (
                <CreateOrEditTodoModal
                    isEditing={false}
                    onSubmit={(data) => {
                        if (!data) return setShowCreateModal(false); // closed
                        handleCreate(data);
                        setShowCreateModal(false);
                    }}
                />
            )}


            {editTodo && (
                <CreateOrEditTodoModal
                    isEditing
                    defaultValues={editTodo}
                    onSubmit={(data) => {
                        if (!data) return setEditTodo(null);
                        handleEdit({ ...editTodo, ...data });
                        setEditTodo(null);
                    }}
                />
            )}


        </main>
    );
};

export default Home;
