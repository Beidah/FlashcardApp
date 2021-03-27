import React, { useState, useEffect } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router";
import CreateCard from "../Card/CreateCard";
import EditCard from "../Card/EditCard";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import DeckInfo from "./DeckInfo";
import Edit from "./EditDeck";
import Study from "./Study";

function Show() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { url } = useRouteMatch();

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
          }
        });
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  

  if (deck) {
    return (
      <>
        <Switch>
          <Route path={url} exact>
            <DeckInfo deck={deck} cards={cards} setCards={setCards} />
          </Route>
          <Route path={`${url}/study`} exact>
            <Study deck={deck} cards={cards} />
          </Route>
          <Route path={`${url}/edit`} exact>
            <Edit deck={deck} setDeck={setDeck} />
          </Route>
          <Route path={`/decks/:deckId/cards/new`} exact>
            <CreateCard setCards={setCards} />
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/edit`} exact>
            <EditCard setCards={setCards} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    )
  }

  return (
    <NotFound />
  )
}

export default Show;