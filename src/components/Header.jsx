import { Button } from "@mui/material";
import React from "react";

const styles = {
  button: {
    color: "teal",
  },
};

const Header = () => {
  return (
    <div className="header">
      <Button sx={styles.button}>MENU</Button>
      <Button sx={styles.button}>TEST</Button>
    </div>
  );
};

export default Header;
