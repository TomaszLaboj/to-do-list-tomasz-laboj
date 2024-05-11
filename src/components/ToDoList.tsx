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
              description={task.description}
              date_added={task.date_added}
              due_date={task.due_date}
              status={task.status}
            />
          </div>
        );
      })}
    </div>
  );
}
