import {OneTask, OneTaskElement} from "../components/oneTask";
import Task from "../components/Task";

interface ToDoListInterface {
    listOfTasks: OneTask[];
}

const ToDoList = ({
                                listOfTasks,
                            }: ToDoListInterface) =>{
    return (
        <div className="todo-list">
            {listOfTasks.map((task: OneTask) => {
                return (
                        <div key={task.id}>
                        <Task
                            title={task.title}
                            description={task.description}
                            dateAdded={new Date(task.date_added).toLocaleDateString()}
                            dueDate={task.due_date && new Date(task.due_date).toLocaleDateString()}
                            status={task.status}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ToDoList;
