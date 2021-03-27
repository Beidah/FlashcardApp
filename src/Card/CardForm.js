import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readCard, updateCard, listCards } from "../utils/api";

function CardForm({submitButtonLabel, cancelButtonLabel, setCards}) {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const createMode = !cardId;
  const blankCard = {front: "", back: ""}
  const [formData, setFormData] = useState(blankCard);

  useEffect(() => {
    if (!createMode) {
      const abortController = new AbortController()

      readCard(cardId, abortController.signal)
        .then(setFormData)
        .catch((err) => console.log(`Error finding Card ${cardId}: ${err}`));

      return () => abortController.abort();
    }
  }, [cardId, createMode]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (createMode) {
      createCard(deckId, formData)
        .then((newCard) => {
          setCards((cards) =>  [...cards, newCard])
          setFormData({front: "", back: ""})
        })
        .catch((err) => {
          console.log(`Error creating card: ${err}`);
        });
    } else {
      updateCard(formData)
        .then(() => {
          listCards(deckId)
            .then(setCards)
          })
        .catch((err) => console.log(`An error occured updating card ${cardId}: ${err}`));
        
      history.push(`/decks/${deckId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea 
          className="form-control" 
          name="front" 
          id="front" 
          placeholder="Front side of the card"
          onChange={handleChange}
          value={formData.front}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea 
          className="form-control" 
          name="back" 
          id="back" 
          placeholder="Back side of the card"
          onChange={handleChange}
          value={formData.back}
          required
        />
      </div>
      <button onClick={handleCancel} className="btn btn-secondary mr-2">{cancelButtonLabel}</button>
      <button type="submit" className="btn btn-primary">{submitButtonLabel}</button>
    </form>
  );
}

export default CardForm;