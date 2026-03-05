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
        <div className="note-input">
            <textarea
                value={title}
                className="title-input"
                placeholder="Title"
                rows={1}
                onInput={autoResize}
                onChange={e => setAddTitle(e.target.value)}
            />
            <br/>

            <textarea
                value={description}
                className="description-input"
                placeholder="Take a note..."
                rows={1}
                onInput={autoResize}
                onChange={e => setAddDescription(e.target.value)}
            />
        </div>
        <div>
            <p>Due Date: </p>
            <input
                type="date"
                value={dueDate}
                placeholder="dd/mm/yyyy"
                onChange={(event) => {
                    handleDateChange(event.target.value);
                }}
            />
        </div>
        <br />
        <button onClick={handleAddTask}>Add task</button>
        </div>

    );
}

export default AddNewTask;