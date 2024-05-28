import { useState, useEffect } from "react";
import "./App.css";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

enum cellType {
  "nought",
  "cross",
  "empty",
}

// true for nought, false for cross

function App() {
  const [buttonState, setButtonState] = useState<cellType[]>([
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
    cellType.empty,
  ]);

  const [gameOver, toggleGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("nought");

  type CellButtonType = {
    value: cellType;
    index: number;
  };

  const checkIfWon = () => {
    if (
      buttonState[0] === cellType.cross &&
      buttonState[1] === cellType.cross &&
      buttonState[2] === cellType.cross) {
      toggleGameOver(true);
    } 
    else if (
      buttonState[3] === cellType.cross &&
      buttonState[4] === cellType.cross &&
      buttonState[5] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[6] === cellType.cross &&
      buttonState[7] === cellType.cross &&
      buttonState[8] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[0] === cellType.cross &&
      buttonState[3] === cellType.cross &&
      buttonState[6] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[1] === cellType.cross &&
      buttonState[4] === cellType.cross &&
      buttonState[7] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[2] === cellType.cross &&
      buttonState[5] === cellType.cross &&
      buttonState[8] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[0] === cellType.cross &&
      buttonState[4] === cellType.cross &&
      buttonState[8] === cellType.cross) {
        toggleGameOver(true);
    }
    else if (
      buttonState[2] === cellType.cross &&
      buttonState[4] === cellType.cross &&
      buttonState[6] === cellType.cross) {
        toggleGameOver(true);
    }
  };

  const updateButtonState = (index: number, currentPlayer: string) => {
    let tempState = buttonState;
    if (buttonState[index] === cellType.empty) {
      switch (currentPlayer) {
        case "nought":
          tempState[index] = cellType.cross;
          setButtonState(tempState);
          setCurrentPlayer("cross");
          break;
        case "cross":
          tempState[index] = cellType.nought;
          setButtonState(tempState);
          setCurrentPlayer("nought");
          break;
        default:
          break;
      }
      checkIfWon();
    } else {
      console.error("already filled");
    }
  };

  const CellButton = ({ value, index }: CellButtonType) => {
    return (
      <>
        {index > 2 && <Divider />}
        <IconButton
          onClick={() => {
            checkIfWon();
            updateButtonState(index, currentPlayer);
            console.log(currentPlayer);
          }}
          disableFocusRipple
          disableRipple
        >
          {value === cellType.empty ? (
            <RadioButtonUncheckedIcon
              sx={{ height: 100, width: 100, color: "#ffffff" }}
            />
          ) : (
            <>
              {value === cellType.nought ? (
                <RadioButtonUncheckedIcon
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: "transparent",
                  }}
                />
              ) : (
                <CloseIcon sx={{ height: 100, width: 100 }} />
              )}
            </>
          )}
        </IconButton>
        {index < 6 && <Divider />}
      </>
    );
  };
  // const renderButtons = buttonState.map((value, index) => (
  //   <CellButton key={index} value={value.value} index={index} />
  // ));

  return (
    <Box>
      {gameOver && <Typography>Game over</Typography>}
      <button onClick={() => console.log(buttonState)}>show</button>
      <Box sx={{ display: "grid", height: 100 }}>
        <Box sx={{ display: "flex" }}>
          <CellButton value={buttonState[0]} index={0} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[1]} index={1} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[2]} index={2} />
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <CellButton value={buttonState[3]} index={3} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[4]} index={4} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[5]} index={5} />
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <CellButton value={buttonState[6]} index={6} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[7]} index={7} />{" "}
          <Divider orientation="vertical" variant="middle" flexItem />
          <CellButton value={buttonState[8]} index={8} />
        </Box>
        {/* {renderButtons} */}
      </Box>
    </Box>
  );
}

export default App;
