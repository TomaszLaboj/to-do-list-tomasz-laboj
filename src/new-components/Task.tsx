import { BiTrash } from "react-icons/bi";

interface TaskInterface {
    id: number | undefined;
    title: string;
    description: string;
    dateAdded: string;
    dueDate: string | undefined;
    status: string;
    deleteTask: (taskId: number | undefined) => void;
}

const Task = ({
        id,
        title,
        description,
        dateAdded,
        dueDate,
        status,
        deleteTask,
}: TaskInterface) => {

    return (
        <div className='task'>
            <h4
                id="task-title"
                className="task-title"
            >
                {title}
            </h4>
            <p
                id="task-description"
                className="task-description"
            >
            {description}
            </p>
            <span className="task-footer">
                <div className="task-footer-date">
                   {dueDate && 'Due date: ' + dueDate}
                </div>
                <button
                    className="task-footer-bin-icon-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(id);
                    }}
                >
                    <BiTrash />
                </button>
            </span>
        </div>

    )
};

export default Task;



