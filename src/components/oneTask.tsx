export interface oneTask {
  description: string;
  date_added: string;
  due_date: string;
  status: string;
  id?: number | undefined;
}
export function OneTaskElement(props: oneTask): JSX.Element {
  return (
    <>
      <div>
        <p>
          <span className="cells">{props.description}</span>
          <span className="cells">{props.date_added}</span>
          <span className="cells">{props.due_date}</span>
          <span className="cells">{props.status}</span>
          <span className="cells">{props.id}</span>
        </p>
      </div>
    </>
  );
}
