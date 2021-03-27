import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckLink() {
    const history = useHistory();

    const buttonHandler = () => {
        history.push("/decks/new");
    }

    return (
        <button onClick={buttonHandler} className="btn btn-secondary mb-3">+ Create Deck</button>
    )
}

export default CreateDeckLink;