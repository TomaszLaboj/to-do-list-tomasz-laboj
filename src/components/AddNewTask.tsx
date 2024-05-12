import {
  formatDateToDayMonthYear,
  formatDateToYearMonthDay,
} from "../utils/dateFormatter";

interface AddNewTaskInterface {
  addDate: string;
  addDescription: string;
  setAddDescription: (value: string) => void;
  setAddDate: (value: string) => void;
  handleAddTask: () => void;
}

export function AddNewTask({
  addDescription,
  addDate,
  setAddDescription,
  setAddDate,
  handleAddTask,
}: AddNewTaskInterface) {
  const formatDate = (date: string) => {
    setAddDate(formatDateToDayMonthYear(date));
  };
  return (
    <div className="input">
      <div>
        <p>Task description: </p>
        <input
          value={addDescription}
          className="inputbox"
          type="text"
          id="description"
          name="description"
          onChange={(event) => {
            setAddDescription(event.target.value);
          }}
        />
      </div>
      <div>
        <p>Due Date: </p>
        <input
          type="date"
          value={formatDateToYearMonthDay(addDate)}
          placeholder="dd/mm/yyyy"
          onChange={(event) => {
            formatDate(event.target.value);
          }}
        />
      </div>
      <br />
      <button onClick={handleAddTask}>Add task</button>
    </div>
  );
}
