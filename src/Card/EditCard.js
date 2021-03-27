import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listCards, readCard, readDeck, updateCard } from "../utils/api";
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
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const blankCard = { front: "", back: "" };
  const [card, setCard] = useState(blankCard);
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

  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      readCard(cardId, abortController.signal)
        .then((card) => {
          if (card.deckId !== deck.id) {
            setCard(undefined);
            throw new Error(`Card ${card.id} not in deck "${deck.name}" (id: ${deck.id})`);
          }
          setCard(card)
        })
        .catch((err) => {
          console.log(`Error finding card: ${err}`);

        });
    }

    loadCard();

    return () => abortController.abort();
  }, [cardId, deck]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    updateCard(card)
      .then(() => {
        listCards(deck.id)
          .then(setCards)
          .catch((err) => console.log(`An error occured updating the card: ${err}`));
        history.push(`/decks/${deck.id}`);
    })
  }

  const handleCancel = () => {
    history.push(`/decks/${deck.id}`)
  }

  if (card) {
    return (
      <div className="container">
        <Breadcrumb deck={deck} active={`Edit Card ${cardId}`} />
        <h2>Edit Card</h2>
        <CardForm handleSubmit={handleSubmit} handleChange={handleChange} handleCancel={handleCancel} formData={card} submitButtonLabel="Submit" cancelButtonLabel="Cancel" />
      </div>
    )
  }

  return <NotFound />
}

export default EditCard;