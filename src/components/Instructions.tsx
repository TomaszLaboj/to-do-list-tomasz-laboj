import "./Instructions.css";

export function Instructions() {
  return (
    <>
      <h1>To-do list</h1>
      <p className="instructions">
        Instructions:
        <br />
        To add a new task to the list provide a description and choose a date -
        otherwise the date will be added as today.
        <br />
        To update task form the "To do" list provide description and choose a
        new date and then click "Update task" on the task you want to update.
        <br />
      </p>
    </>
  );
}
