import React,  { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import CardForm from "./CardForm";
import NotFound from "../Layout/NotFound";

function CreateCard({ setCards }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({})

  
  useEffect(() => {
    setDeck({});
    const abortController = new AbortController();

    async function loadDeck() {
      readDeck(deckId, abortController.signal)
        .then((deck) => {
          setDeck(deck);
          setCards(deck.cards)
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Aborted loadDecks");
          } else {
            console.log("Error loading deck:", error);
            setDeck(undefined);
          }
        });
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId, setCards]);

  const initialCard = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState(initialCard);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    createCard(deck.id, formData, abortController.signal)
      .then((newCard) => {
        setCards((cards) =>  [...cards, newCard])
        setFormData(initialCard)
      })
      .catch((err) => {
        console.log(`Error creating card: ${err}`);
      });

    return () => abortController.abort();
  }

  const handleCancel = () => {
    history.push(`/decks/${deck.id}`)
  }

  if (deck) {
    console.log(deck)
    return (
      <div className="container">
        <Breadcrumb deck={deck} active="Create Card" />
        <h2>{deck.name}: Add Card</h2>
        <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} formData={formData} setFormData={setFormData} submitButtonLabel="Save" cancelButtonLabel="Done" />
      </div>
    )
  }

  return <NotFound />
}

export default CreateCard;