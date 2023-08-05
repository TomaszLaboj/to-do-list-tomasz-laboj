import { oneTask, OneTaskElement } from "./components/oneTask";
import todolist from "./components/toDoList.json";
import { useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const today = new Date().toISOString().substring(0, 10);
  const initialListOfTasks: oneTask[] = todolist;

  const [listOfTasks, setListOfTasks] = useState<oneTask[]>(initialListOfTasks);
  const [addDescription, setAddDescription] = useState<string>("");
  const [addDate, setAddDate] = useState<string>(today);
  const lastIndexOfInitialListOfTasks: number = initialListOfTasks.length + 1;
  const handleAddTask = () => {
    console.log(addDescription, addDate);
    initialListOfTasks.push({
      description: addDescription,
      dateAdded: today,
      dueDate: addDate,
      status: "In progress",
      id: lastIndexOfInitialListOfTasks,
    });

    setListOfTasks([...initialListOfTasks]);
    setAddDescription("");
    setAddDate(today);
  };
  return (
    <>
      <h1>Create new task</h1>
      <p>Description: </p>{" "}
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
      <h1>{addDescription}</h1>
      <h1>{addDate}</h1>
      <table className="table">
        {listOfTasks.map((task) => {
          return (
            <OneTaskElement
              description={task.description}
              dateAdded={task.dateAdded}
              dueDate={task.dueDate}
              status={task.status}
              key={task.id}
            />
          );
        })}
      </table>
    </>
  );
}

export default App;
