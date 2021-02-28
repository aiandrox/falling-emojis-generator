import React from "react";
import { useState, useEffect } from "react";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { ThemeProvider, TextField, Container } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import BackGround from "./BackGround";

let searchTimerId = null;
const theme = createMuiTheme();

function App() {
  const [typingString, setTypingString] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    if (searchTimerId !== null) {
      clearTimeout(searchTimerId);
    }
    searchTimerId = setTimeout(() => {
      search();
    }, 500);
  }, [typingString]);

  useEffect(() => {
    setTimeout(() => {
      const a = emojis
        .filter((elm) => {
          return elm !== "";
        })
        .concat(emoji);
      setEmojis(a);
      setEmoji("");
    }, 3000);
  }, [emoji]);

  function search() {
    const value = typingString;
    if (value === "") return;

    const emojiIndex = new NimbleEmojiIndex(data);
    const emojiArray = emojiIndex.search(value);
    const firstEmoji = emojiArray[0];
    if (!firstEmoji) return;

    if (value === firstEmoji["id"] || emojiArray.length === 1) {
      const emoji = {
        id: firstEmoji["id"],
        bottom: Math.floor(Math.random() * 20) - 10 + "px",
        right: Math.floor(Math.random() * 100) + 1 + "%",
      };

      setEmoji(emoji);
      setTypingString("");
    }
  }

  const RenderEmoji = ({ emoji, isOnly }) => (
    <div
      style={{
        position: "absolute",
        bottom: emoji.bottom,
        right: emoji.right,
      }}
    >
      {isOnly ? (
        <div className="animate__animated animate__fadeInDownBig animate__slower">
          <Emoji emoji={emoji} size={64} />
        </div>
      ) : (
        <div className="">
          <Emoji emoji={emoji} size={64} />
        </div>
      )}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <BackGround></BackGround>

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
        <div>
          {emojis.map((emoji, index) => (
            <RenderEmoji key={index} emoji={emoji} isOnly={false} />
          ))}
          <RenderEmoji emoji={emoji} isOnly={true} />
        </div>

        <h1>input emoji name</h1>

        <TextField
          value={typingString}
          onChange={(e) => setTypingString(e.target.value)}
          variant="outlined"
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
