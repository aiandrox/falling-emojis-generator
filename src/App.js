import React from "react";
import { useState, useEffect } from "react";
import { NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { ThemeProvider, TextField, Container } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import BackGround from "./BackGround";
import Emojis from "./Emojis";

let searchTimerId = null;
let fallingTimerId = null;
const theme = createMuiTheme();

function rand(to) {
  return Math.floor(Math.random() * to) + 1;
}

function App() {
  const [typingString, setTypingString] = useState("");
  const [fallingEmojis, setFallingEmojis] = useState([]);
  const [stackedEmojis, setStackedEmojis] = useState([]);

  useEffect(() => {
    if (fallingTimerId !== null) {
      clearTimeout(fallingTimerId);
    }
    if (searchTimerId !== null) {
      clearTimeout(searchTimerId);
    }
    searchTimerId = setTimeout(() => {
      search();
    }, 500);
  }, [typingString]);

  useEffect(() => {
    fallingTimerId = setTimeout(() => {
      completeFall();
    }, 3000);
  }, [fallingEmojis]);

  function search() {
    const value = typingString;
    if (value === "") return;

    const emojiIndex = new NimbleEmojiIndex(data);
    const emojiArray = emojiIndex.search(value);
    const firstEmoji = emojiArray[0];

    if (value === "pien" || "ぴえん") {
      const pien = emojiIndex.search("pleading")[0];
      fall(pien);
    }

    if (!firstEmoji) return;

    if (
      value.replaceAll(/[-|_]/g, " ") ===
        firstEmoji["id"].replaceAll(/[-|_]/g, " ") ||
      emojiArray.length === 1
    ) {
      fall(firstEmoji);
    }
  }

  function fall(emoji) {
    const newFallingEmojis = [];
    for (let i = 0; i < rand(10) + 10; i++) {
      const bottom = Math.floor(stackedEmojis.length / 80) * 40 + rand(10);
      newFallingEmojis.push({
        id: emoji["id"],
        bottom: bottom - 15 + "px",
        right: rand(120) + "%",
        randValue: rand(100),
      });
    }

    setFallingEmojis(newFallingEmojis);
  }

  function completeFall() {
    setTypingString("");
    setStackedEmojis(stackedEmojis.concat(fallingEmojis));
    setFallingEmojis([]);
  }

  return (
    <ThemeProvider theme={theme}>
      <BackGround></BackGround>
      <Emojis emojis={stackedEmojis} isFalling={false}></Emojis>
      <Emojis emojis={fallingEmojis} isFalling={true}></Emojis>

      <Container
        maxWidth="sm"
        style={{
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>input emoji name</h1>

        <TextField
          value={typingString}
          onChange={(e) => setTypingString(e.target.value)}
          variant="outlined"
          color="secondary"
          fullWidth={true}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
