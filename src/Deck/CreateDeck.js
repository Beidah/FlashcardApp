import React from "react";
import Breadcrumb from "../Layout/Breadcrumb";
import Form from "./DeckForm";


function Create() {
  // const history = useHistory();
  // const initialDeck = {
  //   name: "",
  //   description: ""
  // };
  // const [formData, setFormData] = useState(initialDeck);

  // const handleChange = ({ target }) => {
  //   setFormData({
  //     ...formData,
  //     [target.name]: target.value,
  //   });
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const abortController = new AbortController();

  //   createDeck(formData, abortController.signal)
  //     .then((deck) => {
  //       history.push(`/decks/${deck.id}`);
  //     });

  //   return () => abortController.abort();
  // }

  return (
    <div className="container">
      <Breadcrumb active="Create Deck" />
      <h2>Create Deck</h2>
      <Form buttonLabel="Create Deck" />
    </div>
  );
}

export default Create;