import { OneTask, OneTaskElement } from "./components/oneTask";
import { useState, useEffect } from "react";
import {
  filterTasksAsDone,
  filterTasksAsInprogress,
} from "./utils/filterTasks";
import "./App.css";
import axios from "axios";
import { Instructions } from "./components/Instructions";
import { AddNewTask } from "./components/AddNewTask";

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const [listOfTasks, setListOfTasks] = useState<OneTask[]>([]);

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

  const listOfTasksInProgress: OneTask[] = filterTasksAsInprogress(listOfTasks);
  const listOfTasksMarkedAsDone: OneTask[] = filterTasksAsDone(listOfTasks);

  const getTasksList = () => {
    axios
      .get("https://to-do-back-end-app.onrender.com/todos/")
      .then((response) => setListOfTasks(response.data));
  };

  const handleAddTask = () => {
    const itemToPost: OneTask = {
      description: addDescription,
      date_added: today,
      due_date: addDate,
      status: "In progress",
    };
    axios
      .post("https://to-do-back-end-app.onrender.com/todos/", itemToPost)

      .then(() => setAddDate(today))
      .then(() => setAddDescription(""))
      .then(() => getTasksList());
  };

  const handleDeleteTask = (task: OneTask) => {
    axios
      .delete(`https://to-do-back-end-app.onrender.com/todos/${task.id}`)
      .then(() => getTasksList());
  };

  const handleMarkAsDone = (taskToUpdate: OneTask) => {
    axios

      .put(`https://to-do-back-end-app.onrender.com/todos/${taskToUpdate.id}`, {
        description: taskToUpdate.description,
        date_added: taskToUpdate.date_added,
        due_date: taskToUpdate.due_date,
        status: "Done",
      })
      .then(() => getTasksList());
  };

  const handleUpdateTask = (taskToUpdate: OneTask) => {
    axios

      .put(`https://to-do-back-end-app.onrender.com/todos/${taskToUpdate.id}`, {
        description: addDescription,
        date_added: taskToUpdate.date_added,
        due_date: addDate,
        status: taskToUpdate.status,
      })
      .then(() => setAddDescription(""))
      .then(() => getTasksList());
  };

  return (
    <>
      <h1>Create a new task</h1>
      <Instructions />
      <AddNewTask
        addDate={addDate}
        addDescription={addDescription}
        setAddDescription={setAddDescription}
        setAddDate={setAddDate}
      />
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
