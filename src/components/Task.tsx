import {useEffect, useRef, useState} from "react";


interface TaskInterface {
    title: string;
    description: string;
    dateAdded: string;
    dueDate: string | undefined;
    status: string;
}

const Task = ({
        title,
        description,
        dateAdded,
        dueDate,
        status,
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
            <textarea
                value={title}
                id="title-input"
                className="title-input"
                placeholder="Title"
                rows={1}

                onInput={autoResize}

            />
            <textarea
                value={description}
                ref={descriptionRef}
                id="description-input"
                className="description-input"
                placeholder="Take a note..."
                rows={1}

                onInput={autoResize}

            />
            <span>
                <input
                    type="date"

                    value={dueDate}
                    placeholder="dd/mm/yyyy"
                />
                <button
                    className="close-button"
                >
                    Close
                </button>
            </span>
        </div>

    )
};

export default Task;



