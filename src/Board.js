import React from 'react'
import Square from "./Square";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextPlayerX: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if ( squares[i] || this.calcWinner(squares) ) {
            return
        }
        squares[i] = this.state.nextPlayerX ? 'X' : 'O';
        this.setState({ squares: squares, nextPlayerX: !this.state.nextPlayerX })
    }

    renderSquare(i) {
        return (
            <Square
                value={ this.state.squares[i] }
                onClick={ () => this.handleClick(i) }
            />
        )
    }

    calcWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleRefresh() {
        this.setState({ squares: Array(9).fill(null), nextPlayerX: true })
    }

    render() {

        const winner = this.calcWinner(this.state.squares);
        let status;
        let substatus;
        if (winner) {
            status = 'Winner:';
            substatus = winner;
        } else {
            status = 'Current Player: ';
            substatus = this.state.nextPlayerX ? 'X' : 'O';
        }

        return (
            <React.Fragment>
                <a href="https://github.com/oksromn/xo-react-game" target="_blank">
                    <div className="git-icon">
                        <FontAwesomeIcon icon={faGithub} size="4x"/>
                    </div>
                </a>
                <div className="status">
                    <span> {status} </span>
                </div>
                <div className="status">
                    <span> {substatus} </span>
                </div>
                <div className="board">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <div className="scene">
                    <div className="cube" onClick={ () => this.handleRefresh() }>
                        <span className="side top"> Clear? </span>
                        <span className="side front"> Refresh </span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}