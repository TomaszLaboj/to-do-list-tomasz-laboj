import { OneTask, OneTaskElement } from "./oneTask";

interface ToDoListInterface {
  listOfTasks: OneTask[];
  handleMarkAsDone: (task: OneTask) => void;
  handleDeleteTask: (task: OneTask) => void;
  handleUpdateTask: (task: OneTask) => void;
}

export function ToDoList({
  listOfTasks,
  handleMarkAsDone,
  handleDeleteTask,
  handleUpdateTask,
}: ToDoListInterface) {
  return (
    <div className="table">
      <h2>To do list</h2>
      {listOfTasks.map((task: OneTask) => {
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
              title={task.title}
              description={task.description}
              date_added={new Date(task.date_added).toLocaleDateString()}
              due_date={task.due_date && new Date(task.due_date).toLocaleDateString()}
              status={task.status}
            />
          </div>
        );
      })}
    </div>
  );
}
