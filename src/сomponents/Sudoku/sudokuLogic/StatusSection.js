import React from "react";
import NoteMode from "./NoteMode";
import Undo from "./Undo";
import ClearCell from "./ClearCell";
import "./sudokuStyles.css"

const StatusSection = ({ noteClick, noteMode, undoClick, clearCell, isActive }) => {
    return (
        <div className={`status__section ${isActive ? '' : 'disabled'}`}>
            <Undo undoClick={undoClick}/>
            <ClearCell clearCell={clearCell}/>
            <NoteMode
                noteClick={noteClick}
                noteMode={noteMode}
            />
        </div>
    );
};

export default StatusSection;
