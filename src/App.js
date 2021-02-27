import { useState, useEffect } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { FormControl, Input } from "@material-ui/core";

let searchTimerId = null;

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
    <div>
      <Emoji emoji={emoji} size={32} />
    </div>
  );

  return (
    <div className="App">
      <header className="App-content">
        {emojis.map((emoji) => (
          <RenderEmoji emoji={emoji} />
        ))}
        <FormControl>
          <Input
            id="my-input"
            value={typingString}
            onChange={(e) => setTypingString(e.target.value)}
          />
        </FormControl>
      </header>
    </div>
  );
}

export default App;
