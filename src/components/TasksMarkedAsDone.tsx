import { OneTask, OneTaskElement } from "./oneTask";

interface TasksMarkedAsDone {
  listOfTasksMarkedAsDone: OneTask[];
  handleDeleteTask: (task: OneTask) => void;
}

export function TasksMarkedAsDone({
  listOfTasksMarkedAsDone,
  handleDeleteTask,
}: TasksMarkedAsDone) {
  return (
    <>
      <div className="table">
        <h2>Tasks marked as "Done"</h2>
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
