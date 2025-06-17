import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

const CreateOrEditTodoModal = ({ isEditing, defaultValues = {}, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            title: defaultValues.title || '',
            completed: defaultValues.completed || false,
        },
    });

    const closeAndReset = () => {
        reset();
        onSubmit && onSubmit(null);
    };

    const submit = (data) => {
        onSubmit({
            ...defaultValues,
            ...data,
            completed: data.completed === 'true' || data.completed === true,
        });
        reset();
    };

    return (
        <Dialog open onOpenChange={closeAndReset}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-200 border border-gray-200 dark:border-zinc-700">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submit)} className="space-y-4 mt-4">
                    <Input
                        type="text"
                        placeholder="Todo title"
                        {...register('title', { required: true })}
                    />

                    <select {...register('completed')} className="w-full border rounded px-3 py-2">
                        <option value="false">Incomplete</option>
                        <option value="true">Completed</option>
                    </select>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={closeAndReset}>Cancel</Button>
                        <Button type="submit">{isEditing ? 'Save Changes' : 'Add Todo'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOrEditTodoModal;

