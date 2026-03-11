import {FormEvent, useEffect, useRef, useState} from "react";


interface TaskInterface {
    title: string;
    description: string;
    dateAdded: string;
    dueDate: string | undefined;
    status: string;
    updateTitle: (title: string) => void;
    updateDescription: (description: string) => void;
    updateDueDate: (dueDate: string) => void;
    updateStatus: (status: string) => void;
    closeAndUpdate: () => void;
}

const Task = ({
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
              }: TaskInterface) => {
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if (expanded) {
            descriptionRef.current?.focus();
        }
    }, [expanded]);

    const autoResize = (e: FormEvent<HTMLTextAreaElement>)=> {
        const el = e.currentTarget;
        el.style.height = "0px";
        el.style.height = el.scrollHeight + "px";
    }

    return (
        <div className='task-editor'>
            <span>
                <textarea
                    value={title}
                    id="title-input"
                    className="title-input"
                    placeholder="Title"
                    rows={1}
                    onInput={autoResize}
                    onChange={(e) => updateTitle(e.target.value)}
                />
                <div className="date-added">{new Date(dateAdded).toLocaleDateString()}</div>
            </span>
            <textarea
                value={description}
                ref={descriptionRef}
                id="description-input"
                className="description-input"
                placeholder="Take a note..."
                rows={1}
                onInput={autoResize}
                onChange={(e) => updateDescription(e.target.value)}
            />
            <span>
                <input
                    type="date"
                    value={dueDate ? dueDate : ''}
                    placeholder={dueDate}
                    onChange={(e) => updateDueDate(e.target.value)}
                />
                <button
                    className="close-button"
                    onClick={closeAndUpdate}
                >
                    Close
                </button>
            </span>
        </div>

    )
};

export default Task;



