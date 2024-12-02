import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TaskList from './TaskList';

const TaskManager = ({ username }) => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', completed: false, priority: true },
        { id: 2, text: 'Task 2', completed: true, priority: false },
        { id: 3, text: 'Task 3', completed: false, priority: true },
        { id: 4, text: 'Task 4', completed: false, priority: false },
    ]);

    const [filter, setFilter] = useState('all'); // Sidebar filter: 'all', 'important', etc.

    const filteredTasks = tasks.filter((task) => {
        switch (filter) {
            case 'important':
                return task.priority;
            case 'completed':
                return task.completed;
            case 'pending':
                return !task.completed;
            default: // 'all'
                return true;
        }
    });

    const updateTasks = (newTasks) => {
        setTasks(newTasks); // Handles any updates like marking tasks as complete or changing priority
    };

    return (
        <div className="flex">
            <Sidebar
                username={username}
                tasks={tasks}
                onFilterChange={setFilter} // Sync filter to Sidebar clicks
            />
            <TaskList tasks={filteredTasks} onTasksChange={updateTasks} />
        </div>
    );
};

export default TaskManager;
y