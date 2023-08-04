export interface oneTask {
    description: string,
    dateAdded: string;
    dueDate: string;
    status: string; 
    id?: number;
}
export function OneTaskElement(props:oneTask):JSX.Element{

return(
    <>
    <tr>
        <td className="cells">{props.description}</td>
        <td className="cells">{props.dateAdded}</td>
        <td className="cells">{props.dueDate}</td>
        <td className="cells">{props.status}</td>
        {props.id}
    </tr>
    </>
)

}