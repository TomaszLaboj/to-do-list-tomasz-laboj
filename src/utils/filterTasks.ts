import { oneTask } from "../components/oneTask";

export function filterTasksAsInprogress(listOfTasks: oneTask[]): oneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "In progress"
  );
  return listOfTasksInProgress;
}
export function filterTasksAsDone(listOfTasks: oneTask[]): oneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "Done"
  );
  return listOfTasksInProgress;
}
