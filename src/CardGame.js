/* MJ Review Notes
- The code appears to be syntactically correct. It follows JavaScript and React syntax conventions without any obvious errors
- The code includes comments that describe the purpose of certain functions and provide context for the card definitions. The comments seem informative and reflect the code well.
- Remove commented out lines of code
    //const [hasWon, setHasWon] = useState(false);
- Replace ternary operator
    { cards ? ids.map((id, i) => { return <Card 
    with
    { cards && ids.map((id, i) => ( <Card
- The code appears to be logically sound. However, you might want to add more validation checks, especially in functions like handleCardClick and endSelection, to handle unexpected situations.
- The code seems focused on the frontend and doesn't appear to have direct security vulnerabilities. However, always be cautious when handling user inputs and ensure that backend interactions are secure.
- Use ! instead of === false
    card.complete === false
    !card.complete
- The addition of canPlay to the timer functionality in the useEffect is to ensure that the game-related logic 
  (such as checking for game over when the timer reaches zero) is only executed when the game is still in a playable state. 
  The variable canPlay is used to control whether the player can interact with the game. 
  If canPlay is false, it means the game is over or in a state where further player interactions are not allowed.
- Remove unused imports
- Enhancing console.log statements can provide more detailed information during development and game play.
*/

import { useState, useEffect, useRef } from 'react';
import Card from './Card';

//used only for bug testing. (Card Definitions)
var cardsDef = [
  { face: 'A', faceId: 0, complete: false },
  { face: 'A', faceId: 1, complete: false },
  { face: 'B', faceId: 0, complete: false },
  { face: 'B', faceId: 1, complete: false },
  { face: 'C', faceId: 0, complete: false },
  { face: 'C', faceId: 1, complete: false },
  { face: 'D', faceId: 0, complete: false },
  { face: 'D', faceId: 1, complete: false },
  { face: 'F', faceId: 0, complete: false },
  { face: 'F', faceId: 1, complete: false },
];

function CardGame( props ) {
  const [ cards, setCards ] = useState( props.cards );
  const [ timer, setTimer ] = useState( props.timer );
  const [ fails, setFails ] = useState( props.fails );
  const [ ids, setIds ] = useState( props.ids );
  const [ selectedCardIds, setSelectedCardIds ] = useState( [] );
  const [ canPlay, setCanPlay ] = useState( true );

  const timerInterval = useRef();

  useEffect( () => {
    timerInterval.current = setInterval( () => {
      setTimer( ( prevTimer ) => prevTimer - 1 );
    }, 1000 );
  }, [] );

  useEffect( () => {
    if ( timer <= 0 && canPlay ) {
      console.log("Game Over: Time's up!");
      gameOver();
    }
  }, [ timer, canPlay ] );

  // every time a player selects another card,
  // this checks if the limit of selectable cards has been reached and resets it if so
  useEffect( () => {
    console.log("Selected Card Ids:", selectedCardIds);
    if ( selectedCardIds.length >= 2 ) {
      endSelection();
    }
  }, [ selectedCardIds ] );

  // checks if the max selectable cards has been reached yet. if not, add it to the selectedcards array
  const handleCardClick = ( id ) => {
    if ( selectedCardIds.length < 2 && canPlay ) {
      setSelectedCardIds( [ ...selectedCardIds, id ] );
    } else {
      console.log( 'Cannot click a card yet!' );
    }
  };

  // this is called when the player has selected 2 cards. it checks to see if they got
  // a match and if so, check if thats the final pair and they win.
  const endSelection = () => {
    if ( matched() ) {
      console.log("Match found!");

      cards[ ids[ selectedCardIds[ 0 ] ] ].complete = true;
      cards[ ids[ selectedCardIds[ 1 ] ] ].complete = true;

      console.log(`Matched cards: ${cards[firstCardId].face} and ${cards[secondCardId].face}`);
      checkForVictory();
    } else {
      console.log("No match found");
      setFails( fails - 1 );
      if ( fails - 1 <= 0 ) {
        console.log("Game Over: No more attempts left.");
        gameOver();
      }
    }
    setTimeout( () => {
      setSelectedCardIds( [] );
    }, 1000 );
  };

  // called when a match is found. this checks if theres any cards not completed and if there are none
  // then tell the parent the player has won.
  const checkForVictory = () => {
    const foundIncompletePair = cards.find( ( card ) => !card.complete );

    if ( !foundIncompletePair ) {
      console.log("Victory: All pairs matched!");
      clearInterval( timerInterval.current );
      props.handleVictory();
    }
  };

  const gameOver = () => {
    clearInterval( timerInterval.current );
    setCanPlay( false );
    console.log("Game Over: You Lose!");
    props.handleGameOver();
  };

  const matched = () => {
    const face0 = cards[ ids[ selectedCardIds[ 0 ] ] ].face;
    const face1 = cards[ ids[ selectedCardIds[ 1 ] ] ].face;
    return face0 === face1;
  };

  return (
    <div className="CardGame">
      <h2 className="timer">{timer > 0 ? timer : 'Times Up!'}</h2>
      <div className="cardContainer">
        {cards && ids.map( ( id, i ) => ( <Card
              key={i}
              cardId={id}
              reftableId={i}
              selected={selectedCardIds.includes( i )}
              complete={cards[ id ].complete}
              face={cards[ id ].face}
              handleCardClick={handleCardClick}
            />
          ) )}
      </div>
    </div>
  );
}

export default CardGame;