import "./App.css";
import Header from "./components/Header";
import { Button, Menu, MenuItem } from "@mui/material";
import UnitSentencesReview from "./components/SentencesTest/UnitSentencesReview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function App() {
  const [unit, setUnit] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    <div className="App">
      <Header />
      <div style={{ width: "98%" }}>
        <Button
          sx={{ background: "gray", color: "white", marginTop: "5px" }}
          variant="contained"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
        >
          Unit {unit}
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {renderUnitButtons()}
        </Menu>
      </div>
      <UnitSentencesReview />
    </div>
  );
}

export default App;
