import { useState, useEffect } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { FormControl, Input } from "@material-ui/core";

let searchTimerId = null;

function App() {
  const [typingString, setTypingString] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (searchTimerId !== null) {
      clearTimeout(searchTimerId);
    }
    searchTimerId = setTimeout(() => {
      search();
    }, 500);
  }, [typingString]);

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

  return (
    <div className="App">
      <header className="App-header">
        <Emoji emoji={emoji} size={32} />

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
