import { oneTask,OneTaskElement  } from "./components/oneTask";
import todolist from "./components/toDoList.json"



function App(): JSX.Element {
const listOfTasks: oneTask[] = todolist;


return (
  <>
  <h1>Create new task</h1>
  <p>Description: </p>
  <p>Due date: </p>
    <h1>To do list</h1>
    <div className="header">
      <span>DESCRIPTION </span>
      <span>DATE ADDED </span>
      <span>DUE DATE </span>
      <span>STATUS </span>
    </div>
    <main>
      
        
      {listOfTasks.map((task) => {
        return(
      <OneTaskElement
        description = {task.description}
        dateAdded = {task.dateAdded}
        dueDate={task.dueDate}
        status={task.status}
        key={task.id}
      />)})}
     
    </main>
    
  </>
)
  
}

export default App;

