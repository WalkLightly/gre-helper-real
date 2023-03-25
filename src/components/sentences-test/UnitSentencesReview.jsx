import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Button,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import master_list from "../../data/all_units_combined_list";
import words_master from "../../data/all_defs.json";
import sentence_master from "../../data/all_sentences.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Sentence from "./Sentence";
import "./UnitSentencesReview.css";

const styles = {
  button: {
    fontSize: "10px",
    textTransform: "lowercase",
    color: "black",
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UnitSentencesReview = () => {
  //____________
  // const sentences = [
  //   "Sample sentence to show this ____________ sentences that is done.",
  //   "This is another sample sentence and this is ____________ something completely different.",
  //   "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
  //   "Sample sentence to show this ____________ sentences that is done.",
  //   "This is another sample sentence and this is ____________ something completely different.",
  //   "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
  //   "Sample sentence to show this ____________ sentences that is done.",
  //   "Sample sentence to show this ____________ sentences that is done.",
  //   "This is another sample sentence and this is ____________ something completely different.",
  //   "Once again yet ANOTHER sentence that is ____________ something that is even more differnt than the second.",
  // ];

  const [unit, setUnit] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorDef, setAnchorDef] = useState(null);
  const [wordClicked, setWordClicked] = useState("");
  const [sentences, setSentences] = useState([]);
  const [words, setWords] = useState([]);
  const [unitAnswers, setUnitAnswers] = useState();

  const open = Boolean(anchorEl);
  const definitionOpen = Boolean(anchorDef);

  const [modalOpen, setModalOpen] = React.useState(false);

  const configureRandomSentences = () => {
    if (unit === 99) {
      configureData();
    } else {
      setUnit(99);
    }
  };
  const randomizeSentences = () => {
    // make the unit number be 99, and have that be a special one
    // find 10 random numbers from 800
    // use those as the index number of which sentences I will grab from the master list of sentences
    // grab all the answers from each of the senntences, and combine them to make the list of words that are
    // on top
    let nums = [];
    let sent = [];

    for (var i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * 800);

      if (!nums.includes(random)) {
        nums.push(random);
      }
    }

    for (var num of nums) {
      sent.push(sentence_master[num]);
    }

    return sent;
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const configureData = () => {
    let sent = [];
    let unitWords = [];

    if (unit !== 99) {
      unitWords = master_list[unit - 1].words;
      sent = master_list[unit - 1].sentences;
    } else {
      sent = randomizeSentences();

      for (var i = 0; i < 10; i++) {
        unitWords.push(sent[i][1]);
      }
    }

    let wordsAndDefs = [];
    let wordsChosen = [];

    setUnitAnswers(["", "", "", "", "", "", "", "", "", ""]);
    clearErrors();
    setSentences(sent);

    unitWords.forEach((word) => {
      word = word.trim();
      words_master.forEach((w) => {
        let endIndex = 5;
        if (w[0].length < 5) {
          endIndex = w[0].length;
        }

        if (
          word
            .slice(0, endIndex)
            .includes(w[0].toLowerCase().trim().slice(0, endIndex))
        ) {
          if (!wordsChosen.includes(word)) {
            wordsChosen.push(word);
            wordsAndDefs.push([word, w[1]]);
          }
        }
      });
    });

    setWords(wordsAndDefs);
  };

  useEffect(() => {
    configureData();
  }, []);

  useEffect(() => {
    configureData();
  }, [unit]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDefClick = (event) => {
    words.forEach((w) => {
      if (w[0].trim().toLowerCase() === event.target.textContent) {
        setWordClicked({
          word: event.target.textContent,
          def: w[1].trim().toLowerCase(),
        });
      }
    });
    setAnchorDef(event.currentTarget);
  };

  const handleDefClose = () => {
    setAnchorDef(null);
  };

  const changeAnswer = (answer, index) => {
    let answers = unitAnswers;
    answers[index] = answer;

    setUnitAnswers(answers);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearErrors = () => {
    let sentencesRef = document.getElementsByClassName("sentence");
    for (var i = 0; i < sentencesRef.length; i++) {
      sentencesRef[i].classList.remove("error");
    }
  };

  const validate = () => {
    clearErrors();
    let perfect = true;
    for (var i = 0; i < 10; i++) {
      if (sentences[i][1] !== unitAnswers[i]) {
        document.getElementById(`sentence-${i + 1}`).classList.add("error");
        perfect = false;
      }
    }

    if (perfect) {
      setModalOpen(true);
    }
  };

  const changeUnit = (event) => {
    setUnit(event.target.value);
    handleClose();
  };

  const renderUnitButtons = () => {
    let menuItems = [];

    for (var i = 1; i < 81; i++) {
      menuItems.push(
        <MenuItem value={i} onClick={changeUnit} key={i}>
          Unit {i}
        </MenuItem>
      );
    }
    return menuItems;
  };

  return (
    <div>
      <div style={{ width: "98%" }}>
        <Button
          size="small"
          sx={{
            background: "#ed7966",
            color: "white",
            marginTop: "20px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#f18776",
            },
          }}
          variant="contained"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
        >
          Unit {unit}
        </Button>
        <Button
          onClick={() => {
            setUnit(Math.floor(Math.random() * 80));
          }}
          variant="contained"
          size="small"
          sx={{
            background: "#ed7966",
            color: "white",
            marginTop: "20px",
            marginLeft: "5px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#f18776",
            },
          }}
        >
          Random Unit
        </Button>
        <Button
          onClick={configureRandomSentences}
          size="small"
          variant="contained"
          sx={{
            background: "#ed7966",
            color: "white",
            marginTop: "20px",
            marginLeft: "5px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#f18776",
            },
          }}
        >
          10 random words
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {renderUnitButtons()}
        </Menu>
      </div>
      <Paper elevation={5} className="words-main-container">
        <div className="words">
          {words.map((word) => (
            <Button onClick={handleDefClick} sx={styles.button} key={word[0]}>
              {word[0]}
            </Button>
          ))}
        </div>
      </Paper>
      <Box elevation={10} className="sentences-container">
        <div>
          {sentences.map((sentence, index) => (
            <Sentence
              index={index + 1}
              key={index}
              sentence={sentence[0]}
              correctAnswer={sentence[1]}
              answers={words.map((word) => {
                return word[0];
              })}
              changeAnswer={changeAnswer}
            ></Sentence>
          ))}
        </div>
      </Box>
      <Button
        onClick={validate}
        sx={{
          backgroundColor: "#ed7966",
          color: "white",
          "&:hover": { backgroundColor: "#ed7966" },
          marginBottom: "10px",
          float: "right",
        }}
      >
        Validate
      </Button>
      <Menu
        open={definitionOpen}
        onClose={handleDefClose}
        anchorEl={anchorDef}
        sx={{
          width: "98vw",
        }}
      >
        <Card elevation={0}>
          <CardContent>
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                {wordClicked.word}
              </div>
              <hr />
              {wordClicked.def}
            </div>
          </CardContent>
        </Card>
      </Menu>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "teal",
          }}
        >
          <h2
            style={{
              color: "white",
            }}
          >
            CONGRATULATIONS
          </h2>
          <h3>You are a PRO!</h3>
        </DialogContent>
        <DialogActions sx={{ background: "teal" }}>
          <Button sx={{ color: "white" }} onClick={handleCloseModal}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UnitSentencesReview;
