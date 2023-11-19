/* MJ Review Notes
- The code appears to be syntactically correct. It follows JavaScript and React syntax conventions without any obvious errors
- The code is relatively readable, but some improvements can be made for clarity. For instance, the function names and comments could be more descriptive.
  example:   
  console.log(gameData.timer)
  console.log("Game timer:", gameData.timer);
- The code appears to be free of obvious bugs. 
- The startGame function does not check whether the newGameData is truthy before setting the game data. It might be beneficial to add a check to ensure data integrity.
- Remove unused imports
- Reformat to use more readable structure. Long lines are harder to read.
- The code is relatively concise.
- Use `const` or `let` instead of `var` unless there is a clear reason not to
- The code seems focused on the frontend and doesn't appear to have direct security vulnerabilities. However, always be cautious when handling user inputs and ensure that backend interactions are secure.
- The code already has minimal nesting, and further reduction may compromise readability. 
- The code does not have extensive branching that warrants early returns. The existing structure seems appropriate for the logic flow.
- Remove the getCards and getTimer functions and use the prop directly. Only use a function when it can possibly change the value returned. This enhances readability. 
- Ternary operator not needed to render null. 
  example, change
  {victory && inGame ? <Popup restart={restart} message="YOU WIN!"/> : null}
  to
  {victory && inGame && <Popup restart={restart} message="YOU WIN!" />}
*/

import { useState, useEffect } from 'react';
import CardGame from './CardGame';
import GameOptions from './GameOptions';
import Popup from './Popup';

function App() {
  const [gameData, setGameData] = useState({});
  const [inGame, setInGame] = useState(false);
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    if (!inGame && ready) {
      console.log('Received game data');
      setInGame(true);
    }
  }, [gameData, ready]);

  useEffect(() => {
    console.log('In-game status changed: ' + inGame);
  }, [inGame]);

  const startGame = (newGameData) => {
    if (newGameData) {
      setGameData(newGameData);
      setReady(true);
      console.log('Starting game');
    }
  };

  const restart = () => {
    setReady(false);
    setGameOver(false);
    setInGame(false);
    setVictory(false);
  };

  const handleGameOver = () => {
    setGameOver(true);
    console.log('Game over');
  };

  const handleVictory = () => {
    setVictory(true);
  };

  // returns the ids of the cards scrambled.
  const getIds = () => {
    const ids = gameData.cards.map((cards, i) => i);
    const idsScrambled = ids.sort(() => Math.random() - 0.5);
    console.log('Scrambled IDs:', idsScrambled);
    return idsScrambled;
  };

  return (
    <div className="App">
      {inGame ? (
        <CardGame
          cards={gameData.cards}
          ids={getIds()}
          timer={gameData.timer}
          fails={gameData.fails}
          handleGameOver={handleGameOver}
          handleVictory={handleVictory}
        />
      ) : (
        <GameOptions startGame={startGame} />
      )}
      {gameOver && inGame && !victory && (
        <Popup restart={restart} message="GAME OVER!" />
      )}
      {victory && inGame && <Popup restart={restart} message="YOU WIN!" />}
    </div>
  );
}

export default App;
