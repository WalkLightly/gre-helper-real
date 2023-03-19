import { flexbox } from "@mui/system";
import React from "react";
const Sentence = ({ index, sentence }) => {
  return (
    <div
      style={{
        width: "98%",
        fontSize: "20px",
        marginBottom: "5px",
        display: "grid",
        gridTemplateColumns: "0.1fr 1fr",
      }}
    >
      <div>{index}.</div>
      <div>{sentence}</div>
    </div>
  );
};

export default Sentence;
