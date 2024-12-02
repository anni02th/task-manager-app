import React, { useState } from 'react';
import Login from './components/Login';
import TaskList from './components/TaskList';
import logo from './assets/logo.png';
import TaskDetail from './components/TaskDetail'; // Import the TaskDetail component
import { PieChart } from 'react-minimal-pie-chart'; // Example pie chart library
import userImage from './assets/user.png'; // Replace with your user image path

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [username, setUsername] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null); // Track selected task for details
    const [theme, setTheme] = useState('light'); // Add a state for the theme

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUsername(username);
    };

    const handleAddTask = (task) => {
        setTasks([...tasks, { text: task.text, completed: false, priority: false, date: task.date, description: '', subtasks: [], assignedTo: '' }]);
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        if (selectedTaskIndex === index) {
            setSelectedTaskIndex(null); // Reset selected task if deleted
        }
    };

    const handleToggleTaskCompletion = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle the theme
    };

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const starredTasks = tasks.filter((task) => task.priority).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className={`flex flex-col justify-center m-auto mx-8 gap-4 md:flex-row ${theme === 'dark' ? 'dark' : ''}`}>
            {isAuthenticated ? (
                <>
                    {/* Header Section */}
                    <header className={`flex justify-between bg-${theme === 'dark' ? 'dark' : 'white'} items-center p-4 fixed w-full z-10`}>
                        <div className='flex items-center gap-6'>
                            <button
                                className="p-2 rounded-md text-lg focus:outline-none"
                                onClick={toggleSidebar}
                            >
                                ☰
                            </button>
                            <img src={logo} alt="Logo" className="h-8" />
                        </div>

                        <div className="flex space-x-4">
                            <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
                                <i className="fas fa-search"></i>
                            </button>
                            <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
                                <i className="fas fa-th"></i>
                            </button>
                            <button className="p-2 rounded-md hover:bg-gray-200 focus:outline-none" onClick={toggleTheme}>
                                <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
                            </button>
                        </div>
                    </header>

                    {/* Sidebar */}
                    <aside
                        className={`fixed top-0 left-0 h-full w-72 bg-${theme === 'dark' ? 'dark' : 'green-50'} mt-32 shadow-md rounded-lg p-4 transition-transform duration-300 z-1 ${isSidebarOpen ? 'visible' : 'hidden'} md:relative md:translate-x-0`}
                    >
                        {/* User Profile Section */}
                        <div className="flex flex-col items-center relative top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img
                                src={userImage}
                                alt="User"
                                className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-2"
                            />
                            <h1 className="text-lg font-medium text-gray-700">Hey, {username}!</h1>
                        </div>

                        {/* Navigation Section */}
                        <div className="mt-6 space-y-2">
                            <button className="flex items-center w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-green-100 text-gray-700">
                                <i className="fas fa-tasks mr-2"></i>
                                All Tasks
                            </button>
                            <button className="flex items-center w-full px-4 py-2 rounded-md bg-green-200 text-gray-700">
                                <i className="fas fa-calendar-day mr-2"></i>
                                Today
                            </button>
                            <button className="flex items-center w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-green-100 text-gray-700">
                                <i className="fas fa-star mr-2"></i>
                                Important
                            </button>
                            <button className="flex items-center w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-green-100 text-gray-700">
                                <i className="fas fa-calendar-alt mr-2"></i>
                                Planned
                            </button>
                            <button className="flex items-center w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-green-100 text-gray-700">
                                <i className="fas fa-user-check mr-2"></i>
                                Assigned to me
                            </button>
                        </div>

                        {/* Pie Chart Section */}
                        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-sm font-medium text-gray-700 mb-4">Task Overview</h2>
                            <PieChart
                                data={[
                                    { title: 'Starred', value: starredTasks, color: '#FFD700' },
                                    { title: 'Completed', value: completedTasks, color: '#4caf50' },
                                    { title: 'Pending', value: pendingTasks, color: '#f44336' },
                                ]}
                                lineWidth={20}
                                radius={40}
                                animate
                                style={{ height: '100px', margin: '0 auto' }}
                            />
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-700">{totalTasks} Tasks</p>
                                <p className="text-xs text-gray-500">
                                    {starredTasks} starred, {completedTasks} completed, {pendingTasks} pending
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className={`flex-grow mt-24 ${isSidebarOpen ? 'ml-4' : 'm-auto'} transition-all mix-blend-difference duration-300`}>
                        <section className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Welcome, {username}!</h2>
                            <p className="text-gray-600">Manage your tasks efficiently.</p>
                        </section>

                        {/* Unified Task List */}
                        <section className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">To Do List</h2>
                            <TaskList
                                tasks={tasks}
                                onDeleteTask={handleDeleteTask}
                                onToggleTaskCompletion={handleToggleTaskCompletion}
                                onAddTask={handleAddTask} // Pass down the add task function
                                onSelectTask={(index) => setSelectedTaskIndex(index)} // Track selected task
                            />
                        </section>

                    </main>
                    {/* Task Detail Section */}
                    {selectedTaskIndex !== null && (
                        <div className={`fixed right-4 top-16 w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4 transition-transform duration-300`}>
                            <h3 className="text-lg font-semibold mb-2">Task Details</h3>
                            <TaskDetail
                                task={tasks[selectedTaskIndex]}
                                onClose={() => setSelectedTaskIndex(null)}
                                onDelete={() => handleDeleteTask(selectedTaskIndex)}
                            />
                        </div>
                    )}
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;