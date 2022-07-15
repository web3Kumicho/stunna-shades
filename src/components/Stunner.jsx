import React from "react";
import demShades from "../assets/stunnershades.png";
export const Stunner = ({ imgSrc }) => {
  const canvasRef = React.useRef();
  const stunnerShades = React.useRef();
  const combinedCanvas = React.useRef();
  const shownImage = React.useRef();

  React.useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const stunningContext = stunnerShades.current.getContext("2d");

    const stunners = new Image();
    stunners.src = demShades;
    stunners.onload = () => {
      stunningContext.drawImage(stunners, 0, 0, 256, 256);
    };

    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      context.drawImage(image, 0, 0, 256, 256);
    };
  });
  return (
    <div className="relative max-w-[256px] min-w-[60px] w-full">
      <canvas
        ref={stunnerShades}
        width={256}
        height={256}
        className="absolute z-10"
      />
      <canvas ref={canvasRef} width={256} height={256} className="z-10" />
    </div>
  );
};
