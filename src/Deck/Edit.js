import { useHistory } from "react-router";
import Breadcrumb from "../Layout/Breadcrumb";
import { updateDeck } from "../utils/api";
import Form from "./DeckForm";


function Edit({ deck, setDeck }) {
  const history = useHistory();

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    
    updateDeck(deck, abortController.signal)
      .then((deck) => {
        history.push(`/decks/${deck.id}`);
      });

    return () => abortController.abort();
  }

  return (
    <div className="container">
      <Breadcrumb deck={deck} active="Edit Deck" />
      <h2>Edit Deck</h2>
      <Form handleSubmit={handleSubmit} handleChange={handleChange} formData={deck} buttonLabel="Submit" />
    </div>
  )
}

export default Edit;