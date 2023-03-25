import React, { useState } from "react";
import "./App.css";
import { Button } from "@mui/material";
import UnitSentencesReview from "./components/sentences-test/UnitSentencesReview";
import WordsList from "./components/words-list/WordsList";

const styles = {
  button: {
    color: "white",
    width: "100%",
  },
};

function App() {
  const [route, setRoute] = useState("home");

  const changeRoute = (routeTo) => {
    setRoute(routeTo);
  };

  const routeTo = () => {
    switch (route) {
      case "home":
        return <UnitSentencesReview />;
      case "words":
        return <WordsList />;
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Button
          variant="flat"
          sx={styles.button}
          onClick={() => changeRoute("home")}
        >
          HOME
        </Button>
        <Button
          variant="flat"
          sx={styles.button}
          onClick={() => changeRoute("words")}
        >
          WORDS
        </Button>
      </div>
      <div>{routeTo()}</div>
    </div>
  );
}

export default App;
