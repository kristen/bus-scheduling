import React from 'react';
import './index.css';
import Board from '../board';

interface OwnProps {

}

type Props = OwnProps;

const Game: React.FC<Props> = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
