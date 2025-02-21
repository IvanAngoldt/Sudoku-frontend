import React from "react";
import "./sudokuStyles.css"

const GameSection = (
    {
        gameArray,
        cellSelected,
        initArray,
        onClick,
        incorrectCells,
        highlightCubes,
        highlightNumber,
        notesArray,
        isActive,
    }) => {

    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const selectedCell = (indexOfArray, value) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                if (incorrectCells.includes(indexOfArray)) {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--incorrect game__cell--selected`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                } else {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--userfilled game__cell--selected`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                }
            } else {
                return (
                    <td
                        key={indexOfArray}
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
                key={indexOfArray}
                className={`game__cell game__cell--selected`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const unselectedCell = (indexOfArray, value) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                if (incorrectCells.includes(indexOfArray)) {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--incorrect`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                } else {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--userfilled`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                }
            } else {
                return (
                    <td
                        key={indexOfArray}
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
                key={indexOfArray}
                className={`game__cell`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const highlightCube = (indexOfArray, value) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                if (incorrectCells.includes(indexOfArray)) {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--incorrect game__cell--highlight`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                } else {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--userfilled game__cell--highlight`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                }
            } else {
                return (
                    <td
                        key={indexOfArray}
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
                key={indexOfArray}
                className={`game__cell game__cell--highlight`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const highlightingNumber = (indexOfArray, value) => {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                if (incorrectCells.includes(indexOfArray)) {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--incorrect game__cell--numberHighlight`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                } else {
                    return (
                        <td
                            key={indexOfArray}
                            className={`game__cell game__cell--userfilled game__cell--numberHighlight`}
                            onClick={() => onClick(indexOfArray)}
                        >
                            {value}
                        </td>
                    )
                }
            } else {
                return (
                    <td
                        key={indexOfArray}
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
                key={indexOfArray}
                className={`game__cell game__cell--numberHighlight`}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </td>
        )
    }

    const highlightIncorrect = (indexOfArray, value) => {
        if (value !== '0') {
            if (incorrectCells.includes(indexOfArray)) {
                return (
                    <td
                        key={indexOfArray}
                        className={`game__cell game__cell--incorrectt game__cell--numberHighlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            } else {
                return (
                    <td
                        key={indexOfArray}
                        className={`game__cell game__cell--whyIncorrect game__cell--numberHighlight`}
                        onClick={() => onClick(indexOfArray)}
                    >
                        {value}
                    </td>
                )
            }
        } else {
            return (
                <td
                    key={indexOfArray}
                    className={`game__cell`}
                    onClick={() => onClick(indexOfArray)}
                >
                    {value}
                </td>
            )
        }
    }

    const cellWithNotes = (indexOfArray, notes) => {
        if (indexOfArray === cellSelected) {
            return (
                <td
                    key={indexOfArray}
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
                    key={indexOfArray}
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
                    key={indexOfArray}
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
                    key={indexOfArray}
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
                    key={indexOfArray}
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

    return (
        <section className={`game ${isActive ? '' : 'disabled'}`}>
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

                                    if (notes.length > 0) {
                                        return cellWithNotes(indexOfArray, notes)
                                    } else if (indexOfArray === cellSelected) {
                                        return selectedCell(indexOfArray, value)
                                    } else if (value === highlightNumber && highlightCubes.includes(indexOfArray)) {
                                        return highlightIncorrect(indexOfArray, value)
                                    } else if (value === highlightNumber) {
                                        return highlightingNumber(indexOfArray, value)
                                    } else if (highlightCubes.includes(indexOfArray)) {
                                        return highlightCube(indexOfArray, value)
                                    } else {
                                        return unselectedCell(indexOfArray, value)
                                    }
                                })
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
    )
}

export default GameSection;