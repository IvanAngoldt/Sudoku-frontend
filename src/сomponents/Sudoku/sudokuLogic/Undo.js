import React from 'react';

const Undo = ({undoClick}) => {
    return (
        <div
            onClick={() => undoClick()}
            style={{ cursor: 'pointer'}}
        >

            Отменить последнее действие
        </div>
    )
}

export default Undo;