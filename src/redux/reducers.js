// src/redux/reducers.js

import { LOGIN, LOGOUT, ADD_TASK, DELETE_TASK } from './actions';

const initialAuthState = {
    isAuthenticated: false,
    username: '',
};

const initialTaskState = {
    tasks: [],
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuthenticated: true, username: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false, username: '' };
        default:
            return state;
    }
};

const taskReducer = (state = initialTaskState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((_, index) => index !== action.payload) };
        default:
            return state;
    }
};

const rootReducer = (state = {}, action) => ({
    auth: authReducer(state.auth, action),
    tasks: taskReducer(state.tasks, action),
});

export default rootReducer;