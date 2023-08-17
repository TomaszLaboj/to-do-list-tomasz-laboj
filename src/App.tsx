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

  useEffect(() => {
    function getListOfTasks() {
      axios
        .get("https://to-do-back-end-app.onrender.com/items/")
        .then((response) => response.data)
        .then((response) => setListOfTasks(response));
    }
    getListOfTasks();
  }, [responseStatus]);

  const [listOfTasks, setListOfTasks] = useState<oneTask[]>([]);
  const [addDescription, setAddDescription] = useState<string>("");
  const [addDate, setAddDate] = useState<string>(today);
  const listOfTasksInProgress: oneTask[] = filterTasksAsInprogress(listOfTasks);
  const listOfTasksMarkedAsDone: oneTask[] = filterTasksAsDone(listOfTasks);
  const handleAddTask = () => {
    const itemToPost: oneTask = {
      description: addDescription,
      dateAdded: today,
      dueDate: addDate,
      status: "In progress",
    };
    axios
      .post("https://to-do-back-end-app.onrender.com/items/", itemToPost)

      .then((response) => setResponseStatus(response.status))
      .then(() => setAddDate(today))
      .then(() => setAddDescription(""));
  };
  const handleDeleteTask = (taskId: number | undefined) => {
    axios
      .delete(`https://to-do-back-end-app.onrender.com/items/${taskId}`)
      .then((response) => setResponseStatus(response.status));
  };
  const handleMarkAsDone = (taskToUpdate: oneTask) => {
    axios
      .put(`https://to-do-back-end-app.onrender.com/items/${taskToUpdate.id}`, {
        description: taskToUpdate.description,
        dateAdded: taskToUpdate.dateAdded,
        dueDate: taskToUpdate.dueDate,
        status: "Done",
      })
      .then((response) => setResponseStatus(response.status))
      .catch((error) => setResponseStatus(error));
  };
  const handleUpdateTask = (taskToUpdate: oneTask) => {
    axios
      .put(`https://to-do-back-end-app.onrender.com/items/${taskToUpdate.id}`, {
        description: addDescription,
        dateAdded: taskToUpdate.dateAdded,
        dueDate: addDate,
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
      <p>Task description: </p>{" "}
      <input
        type="text"
        id="description"
        name="description"
        onChange={(event) => {
          setAddDescription(event.target.value);
        }}
      />
      <br />
      <p>Due Date: </p>
      <input
        type="date"
        value={addDate}
        placeholder="dd/mm/yyyy"
        onChange={(event) => {
          setAddDate(event.target.value);
        }}
      />
      <br />
      <button onClick={handleAddTask}>Add task</button>
      <h1>To do list</h1>
      <p>{addDescription}</p>
      <p>{addDate}</p>
      <p>Status:{responseStatus}</p>
      <table className="table">
        {listOfTasksInProgress.map((task) => {
          return (
            <>
              <input type="checkbox" onChange={() => handleMarkAsDone(task)} />
              <span className="checkbox">Mark as done</span>
              <button
                className="button"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete task
              </button>
              <button className="button" onClick={() => handleUpdateTask(task)}>
                Update task
              </button>
              <OneTaskElement
                description={task.description}
                dateAdded={task.dateAdded}
                dueDate={task.dueDate}
                status={task.status}
                key={task.id}
              />
            </>
          );
        })}
      </table>
      <h1>Tasks marked as "Done"</h1>
      <table className="table">
        {listOfTasksMarkedAsDone.map((task) => {
          return (
            <>
              <button
                className="button"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete task
              </button>

              <OneTaskElement
                description={task.description}
                dateAdded={task.dateAdded}
                dueDate={task.dueDate}
                status={task.status}
                key={task.id}
              />
            </>
          );
        })}
      </table>
    </>
  );
}

export default App;
