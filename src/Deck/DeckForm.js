import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createDeck, readDeck, updateDeck } from "../utils/api";

function DeckForm({ deck=undefined, buttonLabel }) {
  const history = useHistory();
  const createMode = !deck;
  console.log(createMode);

  const blankDeck = { name: "", description: "" };
  const [formData, setFormData] = useState(blankDeck);

  useEffect(() => {
    if (!createMode) {
      const abortController = new AbortController();
  
      async function loadDeck() {
        readDeck(deck.id, abortController.signal)
          .then((deck) => {
            console.log(deck);
            setFormData(deck);
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              console.log("Aborted loadDecks");
            } else {
              console.log("Error loading deck:", error);
            }
          });
      }
  
      loadDeck();
  
      return () => abortController.abort();
    }
  }, [createMode, deck]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (createMode) {
      createDeck(formData)
        .then((deck) => {
          history.push(`/decks/${deck.id}`);
        });
    } else {
      updateDeck(formData)
        .then((deck) => {
          history.push(`/decks/${deck.id}`);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          className="form-control" 
          name="name" 
          id="name" 
          placeholder="Deck Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          className="form-control" 
          name="description" 
          id="description" 
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">{buttonLabel}</button>
    </form>
  );
}

export default DeckForm;
