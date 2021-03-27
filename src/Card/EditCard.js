import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import NotFound from "../Layout/NotFound";
import CardForm from "./CardForm";

// class EditCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state.blankCard = { front: "", back: "" };
//   }

//   render() {
//     return EditCardFunc(this.props);
//   }
// }

function EditCard({ setCards }) {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});

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

  if (deckId) {
    return (
      <div className="container">
        <Breadcrumb deck={deck} active={`Edit Card ${cardId}`} />
        <h2>Edit Card</h2>
        <CardForm setCards={setCards} submitButtonLabel="Submit" cancelButtonLabel="Cancel" />
      </div>
    )
  }

  return <NotFound />
}

export default EditCard;