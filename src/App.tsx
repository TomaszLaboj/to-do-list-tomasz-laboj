import { OneTask } from "./components/oneTask";
import { useState, useEffect } from "react";
import {
    filterTasksAsDone,
    showUnfinishedTasks,
} from "./utils/filterTasks";
import "./App.css";
import axios from "axios";
import AddNewTask from "./new-components/AddNewTask";
import { ToDoListOld } from "./components/ToDoListOld";
import { TasksMarkedAsDone } from "./components/TasksMarkedAsDone";
import { Footer } from "./components/Footer";
import Header from "./new-components/Header";
import { url } from './utils/utils'
import ToDoList from "./new-components/ToDoList";

export type TitleAndDescription = {
    title: string;
    description: string;
}

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const [listOfTasks, setListOfTasks] = useState<OneTask[]>([]);
  const [titleAndDescription, setTitleAndDescription] = useState<TitleAndDescription>({ title: '', description: ''});
  const [dueDate, setDueDate] = useState<string>('');

  const getTasksList = () => {
      axios
        .get(`${url}/todos/`)
        .then((response) => setListOfTasks(response.data));
    };

  useEffect(() => {
    getTasksList();
  }, []);

  const listOfTasksInProgress: OneTask[] = showUnfinishedTasks(listOfTasks);
  const listOfTasksMarkedAsDone: OneTask[] = filterTasksAsDone(listOfTasks);

  const handleAddTask = () => {
    const task: OneTask = dueDate ? {
      title: titleAndDescription.title,
      description: titleAndDescription.description,
      date_added: today,
      due_date: dueDate,
      status: "In progress",
    } : {
        title: titleAndDescription.title,
        description: titleAndDescription.description,
        date_added: today,
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
      const task = taskToUpdate.due_date ? {
              title: taskToUpdate.title,
              description: taskToUpdate.description,
              date_added: taskToUpdate.date_added,
              due_date: dueDate,
              status: taskToUpdate.status,
          } : {
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          date_added: taskToUpdate.date_added,
          status: taskToUpdate.status,
      }
      axios
      .put(`${url}/todos/${taskToUpdate.id}`, task)
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
            listOfTasks={listOfTasks}
        />
        <ToDoListOld
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
