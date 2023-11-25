import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        done: false,
        createdAt: new Date().toISOString(), // Adding createdAt timestamp
      };
      state.items = [...state.items, newTask];
    },
    toggleTaskCompletion: (state, action) => {
      state.items = state.items.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    completeAllTasks: (state) => {
      state.items = state.items.map((task) => ({
        ...task,
        done: true,
      }));
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask, completeAllTasks } = tasks.actions;
export default tasks.reducer;