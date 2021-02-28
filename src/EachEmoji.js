import { Emoji } from "emoji-mart";

export default function EachEmoji(props) {
  const emoji = props.emoji;

  return (
    <div
      style={{
        position: "absolute",
        bottom: emoji.bottom,
        right: emoji.right,
      }}
    >
      {props.isFalling ? (
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
}
