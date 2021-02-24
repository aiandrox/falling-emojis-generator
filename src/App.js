import logo from "./logo.svg";
import "./App.css";
import { Emoji } from "emoji-mart";
import { FormControl, Input } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Emoji emoji="thinking_face" size={64} />

        <FormControl>
          <Input id="my-input" value={{ typingString }} />
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
