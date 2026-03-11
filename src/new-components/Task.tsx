import {useEffect, useRef, useState} from "react";
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
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (expanded) {
            descriptionRef.current?.focus();
        }
    }, [expanded]);

    const autoResize = (e: React.FormEvent<HTMLTextAreaElement>)=> {
        const el = e.currentTarget;
        el.style.height = "0px";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <div className='task'>
            <div
                id="title-input"
                className="title-input"
            >
                {title}
            </div>
            <div
                id="description-input"
                className="description-input"
            >
            {description}
            </div>
            <span className="task-footer">
                <div className="task-footer-date">
                   {dueDate && 'Due date: ' + dueDate}
                </div>
                <div className="task-footer-bin-icon">
                    <button
                        className="task-footer-bin-icon-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(id);
                        }}
                    >
                        <BiTrash />
                    </button>
                </div>
            </span>
        </div>

    )
};

export default Task;



