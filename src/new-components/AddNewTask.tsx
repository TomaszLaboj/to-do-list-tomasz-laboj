import {
    formatDateToDayMonthYear,
    formatDateToYearMonthDay,
} from "../utils/dateFormatter";
import React, {useRef} from "react";

interface AddNewTaskInterface {
    dueDate: string;
    title: string;
    description: string;
    setAddTitle: (title: string) => void;
    setAddDescription: (value: string) => void;
    setAddDate: (value: string) => void;
    handleAddTask: () => void;
}

const AddNewTask = ({
    title,
    description,
    dueDate,
    setAddTitle,
    setAddDescription,
    setAddDate,
    handleAddTask,
    }: AddNewTaskInterface) => {
    const handleDateChange = (date: string) => {
        setAddDate(date);
    };

    const autoResize = (e: React.FormEvent<HTMLTextAreaElement>)=> {
        const el = e.currentTarget;
        el.style.height = "0px";
        el.style.height = el.scrollHeight + "px";
    }


    return (
        <div>
        <div className="note-container">
            <textarea
                value={title}
                id="title-input"
                className="title-input"
                placeholder="Title"
                rows={1}
                onInput={autoResize}
                onChange={e => setAddTitle(e.target.value)}
            />

            <textarea
                value={description}
                id="description-input"
                className="description-input"
                placeholder="Take a note..."
                rows={1}
                onInput={autoResize}
                onChange={e => setAddDescription(e.target.value)}
            />
            <span>
                <input
                    type="date"
                    className="date-input"
                    value={dueDate}
                    placeholder="dd/mm/yyyy"
                    onChange={(event) => {
                        handleDateChange(event.target.value);
                    }}
                />
                <button
                    className="close-button"
                    onClick={handleAddTask}
                >
                    Close
                </button>
            </span>
        </div>

        </div>

    );
}

export default AddNewTask;