import React from 'react';

const GameSection = ({
                         onClick, numberSelected,
                         gameArray, cellSelected, initArray
                     }) => {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    /**
     * Cell Highlight Method 2: Highlight all cells with
     * the same number as in the current cell.
     */
    function _isCellSameAsSelectedCell(row, column) {
        if (numberSelected === gameArray[row * 9 + column]) {
            return true;
        }
        return false;
        if (cellSelected === row * 9 + column) {
            return true;
        }
        if (gameArray[cellSelected] === '0') {
            return false;
        }
        if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
            return true;
        }
    }

    /**
     * Returns the classes for a cell related to the selected cell.
     */
    function _selectedCell(indexOfArray, value, highlight) {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td className={`game__cell game__cell--userfilled game__cell--${highlight}selected`}
                        key={indexOfArray} onClick={() => onClick(indexOfArray)}>{value}</td>
                )
            } else {
                return (
                    <td className={`game__cell game__cell--filled game__cell--${highlight}selected`} key={indexOfArray}
                        onClick={() => onClick(indexOfArray)}>{value}</td>
                )
            }
        } else {
            return (
                <td className={`game__cell game__cell--${highlight}selected`} key={indexOfArray}
                    onClick={() => onClick(indexOfArray)}>{value}</td>
            )
        }
    }

    /**
     * Returns the classes or a cell not related to the selected cell.
     */
    function _unselectedCell(indexOfArray, value) {
        if (value !== '0') {
            if (initArray[indexOfArray] === '0') {
                return (
                    <td className="game__cell game__cell--userfilled" key={indexOfArray}
                        onClick={() => onClick(indexOfArray)}>{value}</td>
                )
            } else {
                return (
                    <td className="game__cell game__cell--filled" key={indexOfArray}
                        onClick={() => onClick(indexOfArray)}>{value}</td>
                )
            }
        } else {
            return (
                <td className="game__cell" key={indexOfArray} onClick={() => onClick(indexOfArray)}>{value}</td>
            )
        }
    }

    return (
        <section className="game">
            <table className="game__board">
                <tbody>
                {
                    rows.map((row) => {
                        return (
                            <tr className="game__row" key={row}>
                                {
                                    rows.map((column) => {
                                        const indexOfArray = row * 9 + column;
                                        const value = gameArray[indexOfArray];

                                        if (cellSelected === indexOfArray) {
                                            return _selectedCell(indexOfArray, value, 'highlight');
                                        }

                                        if (cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                                            return _selectedCell(indexOfArray, value, '');
                                        } else {
                                            return _unselectedCell(indexOfArray, value);
                                        }
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </section>
    )
}

export default GameSection
