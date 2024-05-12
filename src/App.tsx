import { OneTask } from "./components/oneTask";
import { useState, useEffect } from "react";
import {
  filterTasksAsDone,
  filterTasksAsInprogress,
} from "./utils/filterTasks";
import "./App.css";
import axios from "axios";
import { Instructions } from "./components/Instructions";
import { AddNewTask } from "./components/AddNewTask";
import { ToDoList } from "./components/ToDoList";
import { TasksMarkedAsDone } from "./components/TasksMarkedAsDone";
import { Footer } from "./components/Footer";
import { formatDateToDayMonthYear } from "./utils/dateFormatter";

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const [listOfTasks, setListOfTasks] = useState<OneTask[]>([]);
  const [addDescription, setAddDescription] = useState<string>("");
  const [addDate, setAddDate] = useState<string>("12/05/2024");
  console.log(today);

  useEffect(() => {
    function getListOfTasks() {
      axios
        .get("https://to-do-back-end-app.onrender.com/todos/")
        .then((response) => setListOfTasks(response.data));
    }
    getListOfTasks();
  }, []);

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
      date_added: formatDateToDayMonthYear(today),
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
      <Instructions />
      <AddNewTask
        addDate={addDate}
        addDescription={addDescription}
        setAddDescription={setAddDescription}
        setAddDate={setAddDate}
        handleAddTask={handleAddTask}
      />

      <ToDoList
        listOfTasks={listOfTasksInProgress}
        handleDeleteTask={handleDeleteTask}
        handleMarkAsDone={handleMarkAsDone}
        handleUpdateTask={handleUpdateTask}
      />
      <TasksMarkedAsDone
        listOfTasksMarkedAsDone={listOfTasksMarkedAsDone}
        handleDeleteTask={handleDeleteTask}
      />
      <Footer />
    </>
  );
}

export default App;
