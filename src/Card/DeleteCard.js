import React from "react";
import { useHistory } from "react-router";
import { deleteCard, listCards } from "../utils/api";


function DeleteCard({ deckId, cardId, setCards }) {
  const history = useHistory();

  const deleteButtonHandler = async () => {
    const abortController = new AbortController();
    if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
      deleteCard(cardId, abortController.signal)
        .then(() => listCards(deckId, abortController.signal))
        .then(setCards)
        .catch((err) => {
          console.log(`Something went wrong: ${err}`);
          history.go(0);
        })
    }

    return () => abortController.abort();
  }

  return (
    <button onClick={deleteButtonHandler} className="btn btn-danger card-link float-right" >Delete</button>
  )
}

export default DeleteCard;