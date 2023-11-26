import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer, { setTasks } from './reducers/tasksSlice';
import { TaskList } from './components/TaskList';
import styled from 'styled-components';

const reducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({
  reducer,
});

const HeadingContainer = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const App = () => {
  //Logic to load tasks from localStorage
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    store.dispatch(setTasks(tasks));
  }
  
  return (
    <Provider store={store}>
        <HeadingContainer>
          <h1>To-Do List</h1>
        </HeadingContainer>
        <TaskList />
        {/* Add other components here */}
    </Provider>
  );
};
