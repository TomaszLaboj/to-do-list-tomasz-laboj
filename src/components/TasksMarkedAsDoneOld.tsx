import { OneTask, OneTaskElement } from "./oneTask";

interface TasksMarkedAsDoneOldProps {
  listOfTasksMarkedAsDone: OneTask[];
  handleDeleteTask: (taskId: number | undefined) => void;
}

export function TasksMarkedAsDoneOld({
  listOfTasksMarkedAsDone,
  handleDeleteTask,
}: TasksMarkedAsDoneOldProps) {
  return (
    <>
      <div className="table">
        <h2>Tasks marked as "Done"</h2>
        {listOfTasksMarkedAsDone.map((task) => {
          return (
            <div key={task.id}>
              <button
                className="button"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete task
              </button>

              <OneTaskElement
                title={task.title}
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
