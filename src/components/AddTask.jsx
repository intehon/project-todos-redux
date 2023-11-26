import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../reducers/tasksSlice';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  background-color: #b5838d;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #e5989b;
  }
`;

export const AddTask = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <SubmitButton type="submit">Add</SubmitButton>
    </Form>
  );
};
