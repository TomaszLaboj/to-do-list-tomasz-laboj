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
    <div>
        <span className= "description"> {props.description}</span>
        <span className= "date">  {props.dateAdded}</span>
        <span className= "date"> {props.dueDate}</span>
        <span className= "status"> {props.status}</span>
         {props.id}
    </div>
    </>

)

}