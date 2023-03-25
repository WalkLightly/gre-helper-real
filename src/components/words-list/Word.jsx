import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const Word = ({ word }) => {
  return (
    <Accordion elevation={5} sx={{ borderRadius: "5px" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="word-header">
        <Typography>{word[0]}</Typography>
      </AccordionSummary>
      <AccordionDetails className="word-details">
        <Typography>{word[1]}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Word;
