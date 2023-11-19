/* MJ Review Notes
- The code appears to be syntactically correct. It follows JavaScript and React syntax conventions without any obvious errors
- The code is relatively readable, but you might consider renaming the props argument to something more specific, like cardProps, for clarity.
- The code is concise, and there are no duplicate lines that can be removed. It's already well-structured.
- The code appears to be free of bugs. 
- Pulling the className checks out of the return could improve readability. 
- When unsure, opt for readability vs conciseness.
- There don't appear to be any security vulnerabilities in the provided code. 
- The onClick handler could potentially be improved for readability. Using the logical AND (&&) instead of the ternary operator might enhance clarity. 
- If you don't want the card to render at all before it is complete, a better approach would be to refactor the onClick handler to return early for better readability.
  function Card(cardProps) {
    if (cardProps.complete) return null;
    ...
    onClick={() => cardProps.handleCardClick(cardProps.reftableId)}>
*/
function Card( cardProps ) {

  const cardComplete = cardProps.complete ? 'complete' : '';
  const cardSelected = cardProps.selected ? 'selected' : 'unselected';

  return (
    <div
      className={`card ${cardComplete} ${cardSelected}`}
      onClick={() =>
        !cardProps.complete && cardProps.handleCardClick( cardProps.reftableId )
      }>
      <h3>{cardProps.face}</h3>
    </div>
  );
}

export default Card;