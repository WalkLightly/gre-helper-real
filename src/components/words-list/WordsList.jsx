import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import Word from "./Word";
import words_master from "../../data/all_defs.json";

const WordsList = () => {
  const [words, setWords] = useState(words_master);

  const filterList = (event) => {
    let word = event.target.value;

    if (word.trim() === "") {
      setWords(words_master);
    } else {
      let filteredWords = [];
      words_master.forEach((w) => {
        if (w[0].toLowerCase().includes(word)) {
          filteredWords.push(w);
        }
      });

      setWords(filteredWords);
    }
  };

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <TextField onChange={filterList} className="words-list-search" />
      </div>
      <Box className="words-list-container">
        {words.map((word) => (
          <Word word={word} key={word[0]} />
        ))}
      </Box>
    </div>
  );
};

export default WordsList;
