import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import moment from 'moment';

import { toggleTaskCompletion, deleteTask } from '../reducers/tasksSlice';

const TaskList = () => {
  const tasks = useSelector((store) => store.tasks.items);
  const dispatch = useDispatch();

  const onCompleteChange = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const onDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <section className="container">
      {tasks.map((task) => (
        <div className="itemContainer" key={task.id}>
          <div className={`item ${task.done && 'done'}`}>
            <input
              className="completedItem"
              type="checkbox"
              checked={task.done}
              onChange={() => onCompleteChange(task.id)}
            />
            <div className="textContainer">
              <p className="taskText">{task.text}</p>
              <p className="date">Created: {moment(task.createdAt).calendar()}</p>
            </div>
            <button className="deleteBtn" onClick={() => onDeleteTask(task.id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TaskList;
