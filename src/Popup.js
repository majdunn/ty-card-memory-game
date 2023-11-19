/* MJ Review Notes
- Remove unused imports
*/

import './Popup.css';

function Popup( props ) {
  return (
    <div className="Popup" onClick={() => props.restart()}>
      <h2>{props.message}</h2>
    </div>
  );
}

export default Popup;