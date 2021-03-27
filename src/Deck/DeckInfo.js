import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import CardList from "../Card/CardList";
import Breadcrumb from "../Layout/Breadcrumb";
import DeleteDeck from "./DeleteDeck";

function DeckInfo({ deck, cards, setCards }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <>
      <div className="container">
        <Breadcrumb active={deck.name} />
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="container">
          <button onClick={() => history.push(`${url}/edit`)} className="btn ml-0 mr-2 btn-secondary">Edit</button>
          <button onClick={() => history.push(`${url}/study`)} className="btn m-2 btn-primary">Study</button>
          <button onClick={() => history.push(`${url}/cards/new`)} className="btn m-2 btn-primary">Add Cards</button>
          <DeleteDeck deckId={deck.id} />
        </div>
      </div>
      <div className="container mt-5">
        <CardList deckId={deck.id} cards={cards} setCards={setCards} />
      </div>
    </>
  );
}

export default DeckInfo;