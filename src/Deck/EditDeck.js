import React from "react";
import Breadcrumb from "../Layout/Breadcrumb";
import DeckForm from "./DeckForm";


function Edit({ deck }) {
  return (
    <div className="container">
      <Breadcrumb deck={deck} active="Edit Deck" />
      <h2>Edit Deck</h2>
      <DeckForm deck={deck} buttonLabel="Submit" />
    </div>
  );
}

export default Edit;