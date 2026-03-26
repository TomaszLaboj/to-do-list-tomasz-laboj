import { OneTask } from "../components/oneTask";

export function filterTasksAsInprogress(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "In progress"
  );
  return listOfTasksInProgress;
}
export function archivedTasks(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status === "Done"
  );
  return listOfTasksInProgress;
}

export function activeTasks(listOfTasks: OneTask[]): OneTask[] {
  const listOfTasksInProgress = listOfTasks.filter(
    (task) => task.status !== "Done"
  );
  return listOfTasksInProgress;
}
