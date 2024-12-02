import React, { useState } from 'react';

const TaskList = ({ tasks, onAddTask, onDeleteTask, onToggleTaskCompletion, onSelectTask }) => {
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() && dueDate) {
            onAddTask({ text: newTask, completed: false, dueDate, assignedTo: '', subtasks: [] });
            setNewTask('');
            setDueDate('');
        }
    };

    return (
        <>
            <div className="flex justify-between gap-4 mb-4">
                {/* Task Input */}
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring"
                />

                {/* Date and Time Picker */}
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="px-4 py-2 border rounded focus:outline-none focus:ring"
                />

                {/* Add Task Button */}
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                    Add
                </button>
            </div>

            {/* Task List */}
            <ul className="divide-y divide-gray-300">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="py-3 px-4 hover:bg-green-100 rounded-lg cursor-pointer"
                        onClick={() => onSelectTask(index)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {/* Styled Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleTaskCompletion(index)}
                                    className="mr-3 h-5 w-5 text-green-500 focus:ring-green-300 rounded border-green-300"
                                />
                                <div>
                                    <span
                                        className={`text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}
                                    >
                                        {task.text}
                                    </span>
                                    <p className="text-sm text-gray-500">
                                        Due: {new Date(task.dueDate).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteTask(index);
                                }}
                            >
                                <i className="fas fa-trash text-red-500"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TaskList;