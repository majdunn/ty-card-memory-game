import { useState } from "react";
import './gameOptions.css';

// Constant for better readability
const FACES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const PAIR_SIZE = 2;

function GameOptions(props) {
  const [pairs, setPairs] = useState(2);
  const [timer, setTimer] = useState(20);
  const [fails, setFails] = useState(20);

  // Function to create an array of cards. faceId is for distinguishing which "A"/"B"/etc card it is.
  // Not currently necessary but may be of use later.
  const generateCards = (count) => {
    const cards = [];
    let faceId = 0;

    const totalPairs = count * PAIR_SIZE;

    for (let i = 0; i < totalPairs; i++) {
      cards.push({
        face: FACES[Math.floor(i / PAIR_SIZE)],
        faceId,
        complete: false
      });

      faceId++;
      if (faceId >= pairSize) faceId = 0;
    }

    console.log(cards);

    return cards;
  }

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "pair":
        setPairs(value)
        break;

      case "timer":
        setTimer(value)
        break;

      case "fails":
        setFails(value)
        break;

      default:
        console.log("Unexpected input name:", name);
    }
  }

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit");

    props.startGame({
      cards: generateCards(pairs),
      timer,
      fails
    });
  }

  const labelName = ["Pairs", "Timer", "Fails"];
  
  return (
    <div className="GameOptions">
      <form onSubmit={handleSubmit}>
        
        {/* Input fields for pairs, timer, and fails */}
        {labelName.map((label) => (
          <label key={label}>
            {label}
            <input
              name={label.toLowerCase()}
              type="number"
              value={label.toLowerCase() === "pairs" 
                ? pairs 
                : label.toLowerCase() === "timer" 
                  ? timer 
                  : fails}
              onChange={handleChange}
            />
          </label>
        ))}
        
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default GameOptions;
