import React from "react";
import { Paper, Box, Button } from "@mui/material";
import "./UnitSentencesReview.css";
import Sentence from "./Sentence";

const UnitSentencesReview = () => {
  const sentences = [
    "Sample sentence to show this ____________ sentences that is done.",
    "This is another sample sentence and this is ____________ something completely different.",
    "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
    "Sample sentence to show this ____________ sentences that is done.",
    "This is another sample sentence and this is ____________ something completely different.",
    "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
    "Sample sentence to show this ____________ sentences that is done.",
    "Sample sentence to show this ____________ sentences that is done.",
    "This is another sample sentence and this is ____________ something completely different.",
    "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
  ];

  return (
    <div>
      <Paper elevation={5} className="words-main-container">
        <div className="words">
          <div>abate</div>
          <div>abjured</div>
          <div>abdicated</div>
          <div>abscission</div>
          <div>aberrations</div>
          <div>absconded</div>
          <div>abeyance</div>
          <div>abstemious</div>
          <div>abject</div>
          <div>abstinence</div>
        </div>
      </Paper>
      <Box elevation={5} className="sentences-container">
        <div>
          {sentences.map((sentence, index) => (
            <Sentence
              index={index + 1}
              key={index}
              sentence={sentence}
            ></Sentence>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default UnitSentencesReview;
