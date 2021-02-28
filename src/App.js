import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { FormControl, Input, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

let searchTimerId = null;

const useStyles = makeStyles({
  container: {
    height: "100vh",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function App() {
  const [typingString, setTypingString] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojis, setEmojis] = useState([]);
  const classes = useStyles();

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
      emojis.push(emoji);
      setEmojis(emojis);
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
          <Emoji emoji={emoji} size={32} />
        </div>
      ) : (
        <div className="">
          <Emoji emoji={emoji} size={32} />
        </div>
      )}
    </div>
  );

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div>
        {emojis.map((emoji, index) => (
          <RenderEmoji key={index} emoji={emoji} isOnly={false} />
        ))}
        <RenderEmoji emoji={emoji} isOnly={true} />
      </div>

      <h1>input emoji name</h1>
      <FormControl>
        <Input
          id="my-input"
          value={typingString}
          onChange={(e) => setTypingString(e.target.value)}
        />
      </FormControl>
    </Container>
  );
}

export default App;
