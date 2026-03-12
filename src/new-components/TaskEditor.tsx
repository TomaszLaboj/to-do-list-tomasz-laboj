import {FormEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import { BiTrash, BiSolidArchive } from "react-icons/bi";


interface TaskEditorInterface {
    id: number | undefined;
    title: string;
    description: string;
    dateAdded: string;
    dueDate: string | undefined;
    status: string;
    updateTitle: (title: string) => void;
    updateDescription: (description: string) => void;
    updateDueDate: (dueDate: string) => void;
    updateStatus: (taskId: number | undefined, status: string) => void;
    closeAndUpdate: () => void;
    deleteTask: (taskId: number | undefined) => void;
}

const TaskEditor = ({
        id,
        title,
        description,
        dateAdded,
        dueDate,
        status,
        updateTitle,
        updateDescription,
        updateDueDate,
        updateStatus,
        closeAndUpdate,
        deleteTask,
              }: TaskEditorInterface) => {
    const taskEditorRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = (e: SyntheticEvent<HTMLTextAreaElement>)=> {
        const el = e.currentTarget;
        el.style.height = "0px";
        el.style.height = el.scrollHeight + "px";
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!taskEditorRef.current?.contains(e.target as Node)) {
                    closeAndUpdate();
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);

        if (titleRef.current) {
            titleRef.current.style.height = "0px";
            titleRef.current.style.height = titleRef.current.scrollHeight + "px";
        }
        if (descriptionRef.current) {
            descriptionRef.current.style.height = "0px";
            descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [title, id, description, dateAdded, dueDate, status, closeAndUpdate]);
    console.log(dueDate)
    return (
        <div

            className="background"
        >
            <div
                ref={taskEditorRef}
                className='task-editor'
            >
                <span>
                    <textarea
                        value={title}
                        ref={titleRef}
                        id="task-editor-title"
                        className="task-editor-title"
                        placeholder="Title"
                        rows={1}
                        onInput={autoResize}
                        onChange={(e) => updateTitle(e.target.value)}
                    />
                    <div className="task-editor-date-added">Date added: {new Date(dateAdded).toLocaleDateString()}</div>
                </span>
                <textarea
                    value={description}
                    ref={descriptionRef}
                    id="task-editor-description"
                    className="task-editor-description"
                    rows={1}
                    onInput={autoResize}
                    onChange={(e) => updateDescription(e.target.value)}
                />
                <span>
                    <input
                        type="date"
                        value={dueDate}
                        // placeholder={"2026-03-20"}
                        onChange={(e) => updateDueDate(e.target.value)}
                    />
                    <span className="task-editor-footer-bin-and-close-buttons">
                        <button
                            onClick={() => updateStatus(id, "Done")}
                           className="task-editor-footer-icon-button"
                        >
                            <BiSolidArchive />
                        </button>
                        <button
                            onClick={() => deleteTask(id)}
                            className="task-editor-footer-icon-button"
                        >
                            <BiTrash />
                        </button>
                        <button
                            className="close-button"
                            onClick={closeAndUpdate}
                        >
                            Close
                        </button>
                    </span>
                </span>
            </div>
        </div>
    )
};

export default TaskEditor;



