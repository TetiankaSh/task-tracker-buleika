// import logo from './logo.svg';
import './App.css';
import React, { use, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if(task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
      <div className="App">
       <h1>Buleika's Task Tracker</h1>
          <div className='input-row'>
            <div className="pencil-wrapper-square input-wrapper">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter repo URL"
              />
            </div>

            <div className="pencil-wrapper-square button-wrapper">
              <button onClick={addTask}>Load issues</button>
            </div>

            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="task-columns">
            <div className="task-column-wrapper">
              <div className="column-title">To Do</div>
              <div className="task-column"> {/* tasks go here */} </div>
            </div>
            <div className="task-column-wrapper">
              <div className="column-title">In Progress</div>
              <div className="task-column"> {/* tasks go here */} </div>
            </div>
            <div className="task-column-wrapper">
              <div className="column-title">Done</div>
              <div className="task-column"> {/* tasks go here */} </div>
            </div>
          </div>

      </div>

  )
}

export default App;
