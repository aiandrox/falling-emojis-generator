import React from "react";
import { useState, useEffect } from "react";

export default function Canvas(props) {
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
    console.log(props.emoji);
  }, []);

  // useEffect(() => {
  //   if (context !== null) {
  //     const img = new Image();
  //     img.src = "img.jpg"; // 描画する画像など
  //   }
  // }, [context]);

  return (
    <canvas
      style={{
        xIndex: -1,
      }}
      width="1280"
      height="720"
      id="canvas"
    ></canvas>
  );
}
