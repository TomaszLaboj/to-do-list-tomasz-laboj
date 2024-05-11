interface AddNewTaskInterface {
  addDate: string;
  addDescription: string;
  setAddDescription: (value: string) => void;
  setAddDate: (value: string) => void;
}

export function AddNewTask({
  addDescription,
  addDate,
  setAddDescription,
  setAddDate,
}: AddNewTaskInterface) {
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
          value={addDate}
          placeholder="dd/mm/yyyy"
          onChange={(event) => {
            setAddDate(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
