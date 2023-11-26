import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import moment from 'moment';
import { AddTask } from './AddTask';
import { toggleTaskCompletion, deleteTask, markAllTasksCompleted } from '../reducers/tasksSlice';
import styled from 'styled-components';

const Container = styled.section`
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const CompleteAllButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.completed ? '#28a745' : '#b5838d')};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 10px; 

  &:hover {
    background-color: ${(props) => (props.completed ? '#218838' : '#e5989b')};
  }
`;

const TaskCounts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;

  &.done {
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

const CompletedItem = styled.input`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #999;
`;


export const TaskList = () => {
  const tasks = useSelector((store) => store.tasks.items);
  const dispatch = useDispatch();



  // Reverse the tasks array to display the most recent task at the top
  const reversedTasks = [...tasks].reverse();

  const onCompleteChange = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const onDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteAllTasks = () => {
    dispatch(markAllTasksCompleted()); 
  };

  const allTasksCompleted = tasks.every((task) => task.done)

  const totalTasksCount = tasks.length;
  const uncompletedTasksCount = tasks.filter((task) => !task.done).length;

  return (
    <Container>
        <AddTask />
        {tasks.length === 0 ? (
            <p>So far, no tasks. Add some to get started!</p>
        ) : (
            <>
            <TaskCounts>
                <p>Total Tasks: {totalTasksCount}</p>
                <p>Uncompleted Tasks: {uncompletedTasksCount}</p>
            </TaskCounts>
            <CompleteAllButton
                completed={allTasksCompleted}
                onClick={handleCompleteAllTasks}
            >
                {allTasksCompleted ? 'Undo Complete All' : 'Complete All'}
            </CompleteAllButton>
                {reversedTasks.map((task) => (
                    <TaskItem key={task.id} className={`item ${task.done && 'done'}`}>
                        <CompletedItem
                        className="completedItem"
                        type="checkbox"
                        checked={task.done}
                        onChange={() => onCompleteChange(task.id)}
                        />
                        <div>
                            <span>{typeof task.text === 'string' ? task.text : String(task.text)}</span>
                            <p>Created: {moment(task.createdAt).calendar(null, {
                            sameDay: '[Today at] HH:mm',
                            lastDay: '[Yesterday at] HH:mm', 
                            lastWeek: 'DD/MM/YYYY HH:mm', 
                            sameElse: 'DD/MM/YYYY HH:mm', 
                            })}</p>
                        </div>
                        <DeleteButton onClick={() => onDeleteTask(task.id)}>
                        <RiDeleteBinLine />
                        </DeleteButton>
                    </TaskItem>
                ))}
            </>
        )}
    </Container>
  );
};