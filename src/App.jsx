import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers/tasksSlice';
import TaskList from './components/TaskList';

const reducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({
  reducer,
});

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>To-Do List</h1>
        <TaskList />
        {/* Add other components here */}
      </div>
    </Provider>
  );
};