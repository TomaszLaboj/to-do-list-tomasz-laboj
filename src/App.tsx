import { OneTask } from "./components/oneTask";
import { useState, useEffect } from "react";
import {
  filterTasksAsDone,
  filterTasksAsInprogress,
} from "./utils/filterTasks";
import "./App.css";
import axios from "axios";
import AddNewTask from "./new-components/AddNewTask";
import { ToDoList } from "./components/ToDoList";
import { TasksMarkedAsDone } from "./components/TasksMarkedAsDone";
import { Footer } from "./components/Footer";
import { formatDateToDayMonthYear } from "./utils/dateFormatter";
import Header from "./new-components/Header";
import { url } from './utils/utils'

export type TitleAndDescription = {
    title: string;
    description: string;
}

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const [listOfTasks, setListOfTasks] = useState<OneTask[]>([]);
  const [titleAndDescription, setTitleAndDescription] = useState<TitleAndDescription>({ title: '', description: ''});
  const [dueDate, setDueDate] = useState<string>('');

  useEffect(() => {
    function getListOfTasks() {
      axios
        .get(`${url}/todos/`)
        .then((response) => setListOfTasks(response.data));
    }
    getListOfTasks();
  }, []);

  const listOfTasksInProgress: OneTask[] = filterTasksAsInprogress(listOfTasks);
  const listOfTasksMarkedAsDone: OneTask[] = filterTasksAsDone(listOfTasks);

  const getTasksList = () => {
    axios
      .get(`${url}/todos/`)
      .then((response) => setListOfTasks(response.data));
  };

  const handleAddTask = () => {
    const task: OneTask = {
      title: titleAndDescription.title,
      description: titleAndDescription.description,
      date_added: today,
      due_date: dueDate,
      status: "In progress",
    };
    axios
      .post(`${url}/todos/`, task)
      .then(() => setDueDate(''))
      .then(() => setTitleAndDescription({title: '', description: ''}))
      .then(() => getTasksList());
  };

  const handleDeleteTask = (task: OneTask) => {
    axios
      .delete(`${url}/todos/${task.id}`)
      .then(() => getTasksList());
  };

  const handleMarkAsDone = (taskToUpdate: OneTask) => {
    axios
      .put(`${url}/todos/${taskToUpdate.id}`, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        date_added: taskToUpdate.date_added,
        due_date: taskToUpdate.due_date,
        status: "Done",
      })
      .then(() => getTasksList());
  };

  const handleUpdateTask = (taskToUpdate: OneTask) => {
    axios
      .put(`${url}/todos/${taskToUpdate.id}`, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        date_added: taskToUpdate.date_added,
        due_date: dueDate,
        status: taskToUpdate.status,
      })
      .then(() => setTitleAndDescription({title: '', description: ''}))
      .then(() => getTasksList());
  };

  const handleUpdateTitle = (value: string) => {
    setTitleAndDescription((prev) => {
        return { ...prev, title: value}
    })
  }

  const handleUpdateDescription = (value: string) => {
        setTitleAndDescription((prev) => {
            return { ...prev, description: value}
        })
  }

  return (
    <>
        <Header />
        <AddNewTask
            dueDate={dueDate}
            title={titleAndDescription.title}
            description={titleAndDescription.description}
            setAddTitle={handleUpdateTitle}
            setAddDescription={handleUpdateDescription}
            setAddDate={setDueDate}
            handleAddTask={handleAddTask}
        />
        <br/>
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
