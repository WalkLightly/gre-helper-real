import React, { useEffect } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

const Sentence = ({
  index,
  sentence,
  correctAnswer,
  answers,
  changeAnswer,
}) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    changeAnswer(event.target.value, index - 1);
    setAge(event.target.value);
  };

  const makeDropDown = () => {
    return (
      <FormControl variant="standard" sx={{ minWidth: 140 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          sx={{ color: "inherit" }}
          onChange={handleChange}
        >
          {answers.map((answer) => {
            return (
              <MenuItem key={answer} value={answer}>
                {answer}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <div
      id={`sentence-${index}`}
      className="sentence"
      style={{
        width: "98%",
        fontSize: "20px",
        marginBottom: "5px",
        display: "grid",
        gridTemplateColumns: "0.1fr 1fr",
      }}
    >
      <div>{index}.</div>
      <div>
        {sentence.split("____________")[0]} {makeDropDown()}
        {sentence.split("____________")[1]}
      </div>
    </div>
  );
};

export default Sentence;
