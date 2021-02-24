import { useState } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { FormControl, Input } from "@material-ui/core";

function App() {
  const [typingString, setTypingString] = useState("");
  const [emoji, setEmoji] = useState("");
  function search(value) {
    setTypingString(value);
    if (value === "") return;

    let emojiIndex = new NimbleEmojiIndex(data);
    let emojiArray = emojiIndex.search(value);
    let firstEmoji = emojiArray[0];
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
            onChange={(e) => search(e.target.value)}
          />
        </FormControl>
      </header>
    </div>
  );
}

export default App;
