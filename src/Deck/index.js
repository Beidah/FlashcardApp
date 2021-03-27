import React, { useState } from "react";
import { Route, Switch }  from "react-router-dom";
import NotFound from "../Layout/NotFound";
import Show from "./Show";
import DeckList from "./DeckList";
import Create from "./CreateDeck";


function Deck() {
  const [decks, setDecks] = useState([]);

  return (
    <>
      <Switch>
        <Route path="/" exact={true} >
          <DeckList decks={decks} setDecks={setDecks} />
        </Route>
        <Route path="/decks/new">
          <Create />
        </Route>
        <Route path="/decks/:deckId">
          <Show setDecks={setDecks} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
    )
}

export default Deck;