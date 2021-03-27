import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { listDecks } from "../utils/api";
import CreateDeckLink from "./CreateDeckLink";
import DeleteDeck from "./DeleteDeck";

function DeckList({ decks, setDecks }) {
  const history = useHistory();
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      listDecks(abortController.signal)
        .then(setDecks)
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Aborted loadDecks");
          } else {
            throw error;
          }
        });
    }

    loadDecks();

    return () => {
      abortController.abort();
    }
  }, [setDecks]);

  const deckList = decks.map((deck, key) => {
    return (
      <div className="card" key={key}>
        <div className="card-body">
          <h4 className="card-title">{deck.name} <small className="card-subtitle mb-2 text-muted float-right">{deck.cards.length} cards</small></h4>
          <p className="card-text">{deck.description}</p>
          <button onClick={() => history.push(`/decks/${deck.id}`)} className="card-link btn btn-secondary">View</button>
          <button onClick={() => history.push(`/decks/${deck.id}/study`)} className="card-link btn btn-primary">Study</button>
          <DeleteDeck deckId={deck.id} className={"card-link"} setDecks={setDecks} />
        </div>
      </div>
    )
  });

  return (
    <>
     <CreateDeckLink />
     { deckList }
    </>
  )
}

export default DeckList;