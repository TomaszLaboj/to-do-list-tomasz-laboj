export function Instructions() {
  return (
    <>
      <h1>Create a new task</h1>
      <p className="instructions">
        Instructions:
        <br />
        To add a new task to the list provide a description and choose a date -
        otherwise the date will be added as today.
        <br />
        To update task form the "To do" list provide description and choose a
        new date and then click "Update task" on the task you want to update.
        <br />
        GitHub repos:{" "}
        <a href="https://github.com/TomaszLaboj/to-do-list-tomasz-laboj">
          front end
        </a>{" "}
        and{" "}
        <a href="https://github.com/TomaszLaboj/to-do-list-back-end-tomasz-laboj">
          back end
        </a>
        .
      </p>
    </>
  );
}
