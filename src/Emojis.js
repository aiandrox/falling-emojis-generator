import EachEmoji from "./EachEmoji";

export default function Emojis(props) {
  return (
    <div>
      {props.emojis.map((emoji, index) => (
        <EachEmoji
          key={index}
          emoji={emoji}
          isFalling={props.isFalling}
        ></EachEmoji>
      ))}
    </div>
  );
}
