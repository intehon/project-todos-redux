import { createSlice } from '@reduxjs/toolkit';

const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  items: loadTasks(), //Load tasks from localStorage initially
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
      saveTasks(state.items); //Save to localStorage
    },
    toggleTaskCompletion: (state, action) => {
      state.items = state.items.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
      saveTasks(state.items); //Save to localStorage
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveTasks(state.items); //Save to localStorage
    },
    markAllTasksCompleted: (state) => { 
      const allTasksCompleted = state.items.every((task) => task.done)

      state.items = state.items.map((task) => ({
        ...task,
        done: !allTasksCompleted,
      }));
      saveTasks(state.items); //Save to localStorage
    },
    setTasks: (state, action) => {
      state.items = action.payload
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask, markAllTasksCompleted, setTasks } = tasks.actions;
export default tasks.reducer;