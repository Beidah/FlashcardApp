import React from "react";
import { useHistory } from "react-router";

function Breadcrumb({ deck=undefined, active }) {
  const history = useHistory();

  const linkTo = (event) => {
    event.preventDefault();
    
    const path = event.target.attributes.href.value;
    history.push(path);
  }

  if (deck) {
    deck = <li className="breadcrumb-item"><a href={`/decks/${deck.id}`} onClick={linkTo}>{deck.name}</a></li>
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/" onClick={linkTo}>Home</a></li>
        { deck }
        <li className="breadcrumb-item active">{active}</li>
      </ol>
    </nav>
  )
}

export default Breadcrumb;