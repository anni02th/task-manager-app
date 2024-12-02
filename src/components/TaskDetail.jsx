import React, { useState } from 'react';

const TaskDetail = ({ task, onClose, onDelete, onUpdateTask }) => {
    const [assignedTo, setAssignedTo] = useState(task.assignedTo || '');
    const [description, setDescription] = useState(task.description || '');
    const [subtasks, setSubtasks] = useState(task.subtasks || []);
    const [newSubtask, setNewSubtask] = useState('');

    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            setSubtasks([...subtasks, { text: newSubtask, completed: false }]);
            setNewSubtask('');
        }
    };

    const handleToggleSubtaskCompletion = (index) => {
        const updatedSubtasks = subtasks.map((subtask, i) =>
            i === index ? { ...subtask, completed: !subtask.completed } : subtask
        );
        setSubtasks(updatedSubtasks);
    };

    const handleSave = () => {
        onUpdateTask({
            ...task,
            assignedTo,
            description,
            subtasks,
        });
        onClose();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Task Details</h3>
            <p className="text-gray-800 mb-4">{task.text}</p>

            {/* Assigned To */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    placeholder="Enter a name"
                />
            </div>

            {/* Due Date */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <p className="text-gray-600">{new Date(task.dueDate).toLocaleString()}</p>
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                    placeholder="Add a description"
                ></textarea>
            </div>

            {/* Subtasks */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subtasks</label>
                <ul className="space-y-2">
                    {subtasks.map((subtask, index) => (
                        <li key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => handleToggleSubtaskCompletion(index)}
                                className="mr-2 h-4 w-4 text-green-500 focus:ring-green-300 rounded border-green-300"
                            />
                            <span
                                className={`text-gray-800 ${subtask.completed ? 'line-through text-gray-400' : ''}`}
                            >
                                {subtask.text}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex mt-2">
                    <input
                        type="text"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring"
                        placeholder="Add a subtask"
                    />
                    <button
                        onClick={handleAddSubtask}
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                >
                    Close
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                    Save
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskDetail;