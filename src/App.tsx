import { oneTask, OneTaskElement } from "./components/oneTask";
import { useState, useEffect } from "react";
import {
  filterTasksAsDone,
  filterTasksAsInprogress,
} from "./utils/filterTasks";
import "./App.css";
import axios from "axios";

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const [responseStatus, setResponseStatus] = useState<number>();
  const [listOfTasks, setListOfTasks] = useState<oneTask[]>([]);

  useEffect(() => {
    function getListOfTasks() {
      axios
        .get("https://to-do-back-end-app.onrender.com/todos/")
        .then((response) => setListOfTasks(response.data));
    }
    getListOfTasks();
  }, []);

  const [addDescription, setAddDescription] = useState<string>("");
  const [addDate, setAddDate] = useState<string>(today);
  const listOfTasksInProgress: oneTask[] = filterTasksAsInprogress(listOfTasks);
  const listOfTasksMarkedAsDone: oneTask[] = filterTasksAsDone(listOfTasks);

  const handleAddTask = () => {
    const itemToPost: oneTask = {
      description: addDescription,
      date_added: today,
      due_date: addDate,
      status: "In progress",
    };
    axios
      .post("https://to-do-back-end-app.onrender.com/todos/", itemToPost)

      .then((response) => setResponseStatus(response.status))
      .then(() => setAddDate(today))
      .then(() => setAddDescription(""));
  };

  const handleDeleteTask = (task: oneTask) => {
    axios
      .delete(`https://to-do-back-end-app.onrender.com/todos/${task.id}`)
      .then((response) => setResponseStatus(response.status));
  };

  const handleMarkAsDone = (taskToUpdate: oneTask) => {
    axios

      .put(`https://to-do-back-end-app.onrender.com/todos/${taskToUpdate.id}`, {
        description: taskToUpdate.description,
        date_added: taskToUpdate.date_added,
        due_date: taskToUpdate.due_date,
        status: "Done",
      })
      .then((response) => setResponseStatus(response.status))
      .catch((error) => setResponseStatus(error));
  };

  const handleUpdateTask = (taskToUpdate: oneTask) => {
    axios

      .put(`https://to-do-back-end-app.onrender.com/todos/${taskToUpdate.id}`, {
        description: addDescription,
        date_added: taskToUpdate.date_added,
        due_date: addDate,
        status: taskToUpdate.status,
      })
      .then((response) => setResponseStatus(response.status))
      .catch((error) => setResponseStatus(error));
  };
  
  return (
    <>
      <h1>Create a new task</h1>
      <p className="instructions">
        Instructions:
        <br />
        To add a new task to the list provide a description and choose a date -
        otherwise the date will be added as today.
        <br />
        To update task form the "To do" list provide description and choose a
        new date and then click "Update task" on the task you want to update.
      </p>

      <div className="input">
        <div>
          <p>Task description: </p>
          <input
            className="inputbox"
            type="text"
            id="description"
            name="description"
            onChange={(event) => {
              setAddDescription(event.target.value);
            }}
            />
        </div>
        <div>
          <p>Due Date: </p>
          <input
            type="date"
            value={addDate}
            placeholder="dd/mm/yyyy"
            onChange={(event) => {
              setAddDate(event.target.value);
            }}
            />
        </div>
      </div>

      <br />
      <button onClick={handleAddTask}>Add task</button>
      <h2>To do list</h2>
      
      <div className="table">
        {listOfTasksInProgress.map((task) => {
          return (
            <div key={task.id}>
              <input type="checkbox" onChange={() => handleMarkAsDone(task)} />
              <span className="checkbox">Mark as done</span>
              <button className="button" onClick={() => handleDeleteTask(task)}>
                Delete task
              </button>
              <button className="button" onClick={() => handleUpdateTask(task)}>
                Update task
              </button>
              <OneTaskElement
                description={task.description}
                date_added={task.date_added}
                due_date={task.due_date}
                status={task.status}
              />
            </div>
          );
        })}
      </div>
      <h2>Tasks marked as "Done"</h2>
      <div className="table">
        {listOfTasksMarkedAsDone.map((task) => {
          return (
            <div key={task.id}>
              <button className="button" onClick={() => handleDeleteTask(task)}>
                Delete task
              </button>

              <OneTaskElement
                description={task.description}
                date_added={task.date_added}
                due_date={task.due_date}
                status={task.status}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
