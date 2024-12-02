// src/redux/actions.js

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const login = (username) => ({
    type: LOGIN,
    payload: username,
});

export const logout = () => ({
    type: LOGOUT,
});

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (index) => ({
    type: DELETE_TASK,
    payload: index,
});