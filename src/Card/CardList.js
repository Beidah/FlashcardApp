import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import DeleteCard from "./DeleteCard";

function CardList({ deckId, cards, setCards }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  if (cards) {
    const cardList = cards.map((card, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-body">
  
            <div className="row">
              <div className="col-6 p-2">
                <p className="card-text">{card.front}</p>
              </div>
              <div className="col-6 p-2">
                <p className="card-text">{card.back}</p>
              </div>
            </div>
            <DeleteCard deckId={deckId} cardId={card.id} setCards={setCards} />
            <button onClick={() => history.push(`${url}/cards/${card.id}/edit`)} className="btn btn-secondary float-right mr-3">Edit</button>
          </div>
        </div>
      );

    });

    return (
      <div className="container mt-5">
        <h2>Cards</h2>
        {cardList}
      </div>
    )
  }
  return (
    <p>No Cards found</p>
  )
}

export default CardList;