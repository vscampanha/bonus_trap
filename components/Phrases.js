import { useState, useEffect } from "react";
import { Quotes } from "../constants";

const Phrases = ({ homeMsg, boxMsg }) => {
  const [phrase, setPhrase] = useState(Quotes[0]);

  const setNewPhrase = () => {
    // if (homeMsg !== 3) {
    let range = Math.floor(Math.random() * Quotes.length);
    setPhrase(Quotes[range]);
    // setTimeout(setNewPhrase, 4000);
    // }
  };

  useEffect(() => {
    if (homeMsg === 1) {
      return setPhrase("Come ON!!! GRAB IT!!! AHAHAAHA");
    } else if (homeMsg > 3) {
      return setPhrase("Go Home... Don't Cry...");
    }

    if (boxMsg % 3 === 0) {
      setNewPhrase();
    }
  }, [homeMsg, boxMsg]);

  useEffect(() => {
    setNewPhrase();
  }, []);

  return (
    <div>
      <h1>{phrase}</h1>
    </div>
  );
};

export default Phrases;
