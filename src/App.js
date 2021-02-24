import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Emoji } from "emoji-mart";
import { FormControl, Input } from "@material-ui/core";

function App() {
  const [typingString, setTypingString] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Emoji emoji="thinking_face" size={64} />

        {typingString}
        <FormControl>
          <Input
            id="my-input"
            value={typingString}
            onChange={(e) => setTypingString(e.target.value)}
          />
        </FormControl>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
