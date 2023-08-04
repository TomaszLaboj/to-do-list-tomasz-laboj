import { oneTask, OneTaskElement } from "./components/oneTask";
import todolist from "./components/toDoList.json";
import "./App.css";

function App(): JSX.Element {
  const listOfTasks: oneTask[] = todolist;

  return (
    <>
      <h1>Create new task</h1>
      <form>
        <label>
          Description:
          <input type="text" name="task" />
          <br />
        </label>
        <label>
          Due date:
          <input type="text" name="date" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>To do list</h1>

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
