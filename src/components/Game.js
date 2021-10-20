import React, {useState, useEffect} from 'react';
import Header from './Header';
import GameSection from './GameSection';
import {getUniqueSudoku} from '../utils/uniqueSudoku';
import StatusSection from './StatusSection'

/**
 * Game is the main React component.
 */
const Game = () => {
    /**
     * All the variables for holding state:
     * gameArray: Holds the current state of the game.
     * initArray: Holds the initial state of the game.
     * solvedArray: Holds the solved position of the game.
     * difficulty: Difficulty level - 'Easy', 'Medium' or 'Hard'
     * numberSelected: The Number selected in the Status section.
     * mistakesMode: Is Mistakes allowed or not?
     * fastMode: Is Fast Mode enabled?
     * cellSelected: If a game cell is selected by the user, holds the index.
     * overlay: Is the 'Game Solved' overlay enabled?
     * won: Is the game 'won'?
     */
    let [numberSelected, setNumberSelected] = useState('0');
    let [gameArray, setGameArray] = useState([]);
    let [cellSelected, setCellSelected] = useState(-1);
    let [won, setWon] = useState(false);
    let [initArray, setInitArray] = useState([]);
    let [solvedArray, setSolvedArray] = useState([]);
    let [overlay, setOverlay] = useState(true);

    /**
     * Creates a new game and initializes the state variables.
     */
    function _createNewGame(e) {
        let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku('Easy', e);

        setInitArray(temporaryInitArray);
        setGameArray(temporaryInitArray);
        setSolvedArray(temporarySolvedArray);
        setNumberSelected('0');
        setCellSelected(-1);
        setWon(false);
    }

    /**
     * Checks if the game is solved.
     */
    function _isSolved(index, value) {
        if (gameArray.every((cell, cellIndex) => {
            if (cellIndex === index)
                return value === solvedArray[cellIndex];
            else
                return cell === solvedArray[cellIndex];
        })) {
            return true;
        }
        return false;
    }

    /**
     * Fills the cell with the given 'value'
     * Used to Fill / Erase as required.
     */
    function _fillCell(index, value) {
        if (initArray[index] === '0') {
            // Direct copy results in interesting set of problems, investigate more!
            let tempArray = gameArray.slice();

            tempArray[index] = value;
            setGameArray(tempArray);

            if (_isSolved(index, value)) {
                setOverlay(true);
                setWon(true);
            }
        }
    }

    /**
     * A 'user fill' will be passed on to the
     * _fillCell function above.
     */
    function _userFillCell(index, value) {
        if (value === solvedArray[index]) {
            _fillCell(index, value);
        } else {
            setOverlay(true)
        }
    }

    /**
     * On Click of 'New Game' link,
     * create a new game.
     */
    function onClickNewGame() {
        _createNewGame();
    }

    /**
     * On Click of a Game cell.
     */
    function onClickCell(indexOfArray) {
        if (numberSelected !== '0') {
            _userFillCell(indexOfArray, numberSelected);
        }
        setCellSelected(indexOfArray);
    }

    /**
     * On Click of Number in Status section,
     * either fill cell or set the number.
     */
    function onClickNumber(number) {
        if (cellSelected !== -1) {
            _userFillCell(cellSelected, number);
        }
    }

    /**
     * Close the overlay on Click.
     */
    function onClickOverlay() {
        setOverlay(false);
        _createNewGame();
    }

    /**
     * On load, create a New Game.
     */
    useEffect(() => {
        _createNewGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={overlay ? "container blur" : "container"}>
                <Header onClick={onClickNewGame}/>
                <div className="innercontainer">
                    <GameSection
                        onClick={(indexOfArray) => onClickCell(indexOfArray)}
                        numberSelected={numberSelected}
                        gameArray={gameArray}
                        cellSelected={cellSelected}
                        initArray={initArray}
                    />
                    <StatusSection
                        onClickNumber={onClickNumber}
                        numberSelected={numberSelected}
                    />
                </div>
            </div>
            <div className={overlay
                ? "overlay overlay--visible"
                : "overlay"
            }
                 onClick={onClickOverlay}
            >
                <h2 className="overlay__text">
                    You <span className="overlay__textspan1">{won ? 'solved' : 'lost'}</span> <span
                    className="overlay__textspan2">it!</span>
                </h2>
            </div>
        </>
    );
}

export default Game;
