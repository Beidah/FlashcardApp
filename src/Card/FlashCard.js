import React, { useState } from "react";
import { useHistory } from "react-router";


function FlashCard({ deckId, cards }) {
  const history = useHistory();
  const [activeCard, setActiveCard] = useState(0);
  const [cardSide, setCardSide] = useState("front");

  const onFlip = () => {
    setCardSide((side) => {
      if (side === "front") {
        return "back";
      } else {
        return "front";
      }
    })
  }

  const onNext = () => {
    setActiveCard((activeCard) => {
      if (activeCard < cards.length - 1) {
        return activeCard + 1;
      } else {
        return 0;
      }
    });
    setCardSide("front");
  }

  if (cards && cards.length > 2) {
    let display;
    let nextButton;
    if (cardSide === "front") {
      display = cards[activeCard].front;
      nextButton = undefined;
    } else {
      display = cards[activeCard].back;
      nextButton = <button onClick={onNext} className="btn btn-primary">Next</button>;
    }

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card {activeCard + 1} of {cards.length}</h5>
          <p className="card-text">{ display }</p>
          <button onClick={onFlip} className="btn btn-secondary mr-3">Flip</button>
          {nextButton}
        </div>
      </div>
    )
  }

  return (
    <>
      <h3>Not Enough Cards</h3>
      <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)} className="btn btn-primary">Add Card</button>
    </>
  )
}

export default FlashCard;