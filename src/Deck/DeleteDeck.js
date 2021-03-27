import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { deleteDeck, listDecks } from "../utils/api";

function DeleteDeck({ deckId, className, setDecks }) {
  const history = useHistory();

  const routeMatch = useRouteMatch();

  const deleteButtonHandler = async () => {
    const abortController = new AbortController();
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      deleteDeck(deckId, abortController.signal)
        .then(() => listDecks(abortController.signal))
        .then(setDecks)
        .then(() => {
          if (routeMatch.url !== "/") {
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Something went wrong: ${err}`);
          history.go(0);
        })
    }

    return () => abortController.abort();
  }

  return (
    <button onClick={deleteButtonHandler} className={`${className} btn btn-danger float-right`}>Delete</button>
  )
}

export default DeleteDeck;