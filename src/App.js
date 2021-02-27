import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { FormControl, Input, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

let searchTimerId = null;

const useStyles = makeStyles({
  emoji: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    position: "absolute",
    bottom: "10px",
    right: Math.floor(Math.random() * 1100) + 1,
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
    emojis.push(emoji);
    setEmojis(emojis);
  }, [emoji]);

  function search() {
    const value = typingString;
    if (value === "") return;

    const emojiIndex = new NimbleEmojiIndex(data);
    const emojiArray = emojiIndex.search(value);
    const firstEmoji = emojiArray[0];
    if (!firstEmoji) return;

    if (value === firstEmoji["id"] || emojiArray.length === 1) {
      setEmoji(firstEmoji);
      setTypingString("");
    }
  }

  const RenderEmoji = ({ emoji }) => (
    <div className={classes.emoji}>
      <div className="animate__animated animate__fadeInDownBig">
        <Emoji emoji={emoji} size={32} />
      </div>
    </div>
  );

  return (
    <Container maxWidth="sm">
      <div>
        {emojis.map((emoji, index) => (
          <RenderEmoji key={index} emoji={emoji} />
        ))}
      </div>

      <h1>input emoji name</h1>
      <p>example: thinking_face</p>
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
