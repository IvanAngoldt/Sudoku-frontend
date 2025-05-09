import React from "react";
import "./trainerStyles.css"

const TrainGameSection = (
    {
        gameArray,
        initArray,
        onClick,
        cellSelected,

        highlightCells,
        highlightOneCell,

        highlightCellsWithNote,
        highlightNotes,

        highlightCellsWithBadNote,
        highlightBadNotes,

        highlightCubes,
        highlightNumber,
        notesArray,
    }) => {

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const selectedCell = (indexOfArray, value, key) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--userfilled game__cell--selected`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            } else {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--filled game__cell--selected`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            }
        }
        return (
            <td
                key={key}
                className={`game__cell game__cell--selected`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const unselectedCell = (indexOfArray, value, key) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--userfilled`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            } else {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--filled`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            }
        }
        return (
            <td
                key={key}
                className={`game__cell`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const highlightCube = (indexOfArray, value, key) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--userfilled game__cell--highlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            } else {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--filled game__cell--highlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            }
        }
        return (
            <td
                key={key}
                className={`game__cell game__cell--highlight`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const highlightingNumber = (indexOfArray, value, key) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--userfilled game__cell--numberHighlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            } else {
                return (
                    <td
                        key={key}
                        className={`game__cell game__cell--filled game__cell--numberHighlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            }
        }
        return (
            <td
                key={key}
                className={`game__cell game__cell--numberHighlight`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const cellWithNotes = (indexOfArray, notes, key) => {
        if (indexOfArray === cellSelected) {
            return (
                <td
                    key={key}
                    className="game__cell game__cell--notes game__cell--selected"
                    onClick={() => onClick(indexOfArray)}>
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="game__note"
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            )
        } else if (notes.includes(highlightNumber) && highlightCubes.includes(indexOfArray)) {
            return (
                <td
                    key={key}
                    className="game__cell game__cell--notes game__cell--highlight"
                    onClick={() => onClick(indexOfArray)}
                >
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className={`game__note ${note === highlightNumber ? 'game__note--numberHighlight' : ''}`}
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            )
        } else if (notes.includes(highlightNumber)) {
            return (
                <td
                    key={key}
                    className="game__cell game__cell--notes"
                    onClick={() => onClick(indexOfArray)}
                >
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className={`game__note ${note === highlightNumber ? 'game__note--numberHighlight' : ''}`}
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            )
        } else if (highlightCubes.includes(indexOfArray)) {
            return (
                <td
                    key={key}
                    className="game__cell game__cell--notes game__cell--highlight"
                    onClick={() => onClick(indexOfArray)}
                >
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="game__note"
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            )
        } else {
            return (
                <td
                    key={key}
                    className="game__cell game__cell--notes"
                    onClick={() => onClick(indexOfArray)}>
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="game__note"
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            )
        }

    }

    const highlightCell = (indexOfArray, value, key) => {
        const notes = notesArray[indexOfArray] || [];
    
        if (notes.length > 0) {
            return (
                <td
                    key={key}
                    className={`game__cell game__cell--notes game__cell--highlight`}
                    onClick={() => onClick(indexOfArray)}
                >
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            className="game__note"
                            style={{
                                top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                                left: `${((note - 1) % 3) * (100 / 3)}%`
                            }}
                        >
                            {note}
                        </div>
                    ))}
                </td>
            );
        }

        if (value !== '0') {
            return (
                <td
                    key={key}
                    className={`game__cell game__cell--filled game__cell--highlight`}
                    onClick={() => onClick(indexOfArray)}
                >
                    {value}
                </td>
            );
        } else {
            return (
                <td
                    key={key}
                    className={`game__cell game__cell--highlight`}
                    onClick={() => onClick(indexOfArray)}
                >
                    {value}
                </td>
            );
        }
         
    };

    const highlightWithNote = (indexOfArray, notes, highlightNotes, key) => {
        return (
            <td
                key={key}
                className="game__cell game__cell--notes game__cell--highlight"
                onClick={() => onClick(indexOfArray)}
            >
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="game__note"
                        style={{
                            top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                            left: `${((note - 1) % 3) * (100 / 3)}%`,
                            color: highlightNotes.includes(note) ? 'black' : undefined,
                            backgroundColor: highlightNotes.includes(note) ? 'yellow' : undefined,
                        }}
                    >
                        {note}
                    </div>
                ))}
            </td>
        );
    };
    
    const highlightWithBadNote = (indexOfArray, notes, highlightBadNotes, key) => {
        return (
            <td
                key={key}
                className="game__cell game__cell--notes game__cell--highlight"
                onClick={() => onClick(indexOfArray)}
            >
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="game__note"
                        style={{
                            top: `${Math.floor((note - 1) / 3) * (100 / 3)}%`,
                            left: `${((note - 1) % 3) * (100 / 3)}%`,
                            color: highlightBadNotes.includes(note) ? 'black' : undefined,
                            backgroundColor: highlightBadNotes.includes(note) ? 'orange' : undefined,
                        }}
                    >
                        {note}
                    </div>
                ))}
            </td>
        );
    };

    const getLabel = (i) => {
        const code = 65 + i;
        return String.fromCharCode(code >= 73 ? code + 1 : code); // пропускаем I
    };

    return (
        <section className={`game`}>
            <div className="name_column">
            {[...Array(9)].map((_, row) => (
                <div className="name_column-label" key={row}>
                <div className="column-label-item">
                    {getLabel(row)}
                </div>
                </div>
            ))}
            </div>
            <div className="game__grid-wrapper">
                <div className="name_row">
                    {[...Array(9)].map((_, col) => (
                        <div key={col} className="name_row-label">{col + 1}</div>
                    ))}
                </div>

                <table className="game__board">
                    <tbody>
                    {
                        rows.map((row) => (
                            <tr className="game__row" key={row}>
                                {
                                    rows.map(column => {
                                        const indexOfArray = row * 9 + column
                                        const value = gameArray[indexOfArray]
                                        const notes = notesArray[indexOfArray] || []
                                        
                                        if (highlightCells.includes(indexOfArray)) {
                                            return highlightCell(indexOfArray, value, indexOfArray)
                                        } else if (highlightOneCell.includes(indexOfArray)) {
                                            return highlightingNumber(indexOfArray, value, indexOfArray)
                                        } else if (highlightCellsWithNote.includes(indexOfArray)) {
                                            return highlightWithNote(indexOfArray, notes, highlightNotes, indexOfArray)
                                        } else if (highlightCellsWithBadNote.includes(indexOfArray)) {
                                            return highlightWithBadNote(indexOfArray, notes, highlightBadNotes, indexOfArray)
                                        } else if (notes.length > 0) {
                                            return cellWithNotes(indexOfArray, notes, indexOfArray)
                                        } else if (indexOfArray === cellSelected) {
                                            return selectedCell(indexOfArray, value, indexOfArray)
                                        } else if (value === highlightNumber) {
                                            return highlightingNumber(indexOfArray, value, indexOfArray)
                                        } else if (highlightCubes.includes(indexOfArray)) {
                                            return highlightCube(indexOfArray, value, indexOfArray)
                                        } else {
                                            return unselectedCell(indexOfArray, value, indexOfArray)
                                        }
                                    })
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )

    
}

export default TrainGameSection;