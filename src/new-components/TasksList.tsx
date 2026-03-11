import { useState } from 'react';
import {OneTask} from "../components/oneTask";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import isEqual from "lodash/isEqual";

interface ListOfTasksProps {
    listOfTasks: OneTask[];
    updateTask: (task: OneTask) => void;
}

const TasksList = ({
    listOfTasks,
    updateTask,
}: ListOfTasksProps) => {
    const [highlightedTask, setHighlightedTask] = useState<OneTask | undefined>(undefined)
    const [highlightedTaskOriginal, setHighlightedTaskOriginal] = useState<OneTask | undefined>(undefined)
    console.log(highlightedTask, highlightedTaskOriginal)
    const [edited, setEdited] = useState(false);

    console.log(edited);
    const handleHighlightTask = (task: OneTask) => {
        setHighlightedTask(task);
        setHighlightedTaskOriginal({...task})
    }


    const handleUpdateTitle = (value: string) => {
        setEdited(true);
        setHighlightedTask((prev) => {
            if (prev) {
                return (
                    {
                        ...prev,
                        title: value
                    }
                )}
        })
    };

    const handleUpdateDescription = (value: string) => {
        setEdited(true);
        setHighlightedTask((prev) => {
            if (prev) {
                return (
                    {
                        ...prev,
                        description: value
                    }
                )}
        })
    };

    const handleUpdateDueDate = (value: string) => {
        setEdited(true);
        setHighlightedTask((prev) => {
            if (prev) {
                return (
                    {
                        ...prev,
                        due_date: value
                    }
                )}
        })
    };

    const handleUpdateStatus = (value: string) => {
        setEdited(true);
        setHighlightedTask((prev) => {
            if (prev) {
                return (
                    {
                        ...prev,
                        status: value
                    }
                )}
        })
    };

    const handleCloseAndUpdate = () => {
        if (highlightedTask && edited && !isEqual(highlightedTask, highlightedTaskOriginal)) {
            updateTask(highlightedTask);
        }
        setEdited(false);
        setHighlightedTask(undefined);
        setHighlightedTaskOriginal(undefined);
    };


    return (
        <>
        <div className="todo-list">
            {listOfTasks.map((task: OneTask) => {
                return (
                        <div
                            key={task.id}
                            onClick={() => handleHighlightTask(task)}
                        >
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
        {highlightedTask &&
            <div className="background">
                <TaskEditor
                    title={highlightedTask?.title}
                    description={highlightedTask?.description}
                    dateAdded={highlightedTask?.date_added}
                    dueDate={highlightedTask?.due_date}
                    status={highlightedTask?.status}
                    updateTitle={handleUpdateTitle}
                    updateDescription={handleUpdateDescription}
                    updateStatus={handleUpdateStatus}
                    updateDueDate={handleUpdateDueDate}
                    closeAndUpdate={handleCloseAndUpdate}
                />
            </div>
        }
        </>
    );
};

export default TasksList;
