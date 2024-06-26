import { OneTask } from "../components/oneTask";

export function filterTasksAsInprogress(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "In progress"
  );
  return listOfTasksInProgress;
}
export function filterTasksAsDone(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "Done"
  );
  return listOfTasksInProgress;
}
