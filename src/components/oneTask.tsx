export interface oneTask {
  description: string;
  dateAdded: string;
  dueDate: string;
  status: string;
  id?: number | undefined;
}
export function OneTaskElement(props: oneTask): JSX.Element {
  return (
    <>
      <div>
        <p>
          <span className="cells">{props.description}</span>
          <span className="cells">{props.dateAdded}</span>
          <span className="cells">{props.dueDate}</span>
          <span className="cells">{props.status}</span>
          <span className="cells">{props.id}</span>
        </p>
      </div>
    </>
  );
}
