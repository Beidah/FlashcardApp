import React from "react";
import FlashCard from "../Card/FlashCard";
import Breadcrumb from "../Layout/Breadcrumb";


function Study({ deck, cards }) {
  return (
    <div className="container">
      <Breadcrumb deck={deck} active="Study" />
      <h2>{deck.name}: Study</h2>
      <FlashCard deckId={deck.id} cards={cards} />
    </div>
  );
}

export default Study;