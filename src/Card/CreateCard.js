import React,  { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import CardForm from "./CardForm";
import NotFound from "../Layout/NotFound";

function CreateCard({ setCards }) {
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const abortController = new AbortController();

  //   createCard(deck.id, formData, abortController.signal)
  //     .then((newCard) => {
  //       setCards((cards) =>  [...cards, newCard])
  //       setFormData(initialCard)
  //     })
  //     .catch((err) => {
  //       console.log(`Error creating card: ${err}`);
  //     });

  //   return () => abortController.abort();
  // }

  if (deck) {
    return (
      <div className="container">
        <Breadcrumb deck={deck} active="Add Card" />
        <h2>{deck.name}: Add Card</h2>
        <CardForm setCards={setCards} submitButtonLabel="Save" cancelButtonLabel="Done" />
      </div>
    )
  }

  return (
    <NotFound />
  )
}

export default CreateCard;