import React from "react";

import Menu from "../src/components/Menu";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";

export default function Video(props) {
  const contexto = React.useContext(ColorModeContext);
  console.log(props);
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  return (
    <>
      <Menu />
      <div>
        Vídeo!
        {contexto.mode}
        <button onClick={() => contexto.toggleMode()}>Trocar Modo</button>
      </div>
      <iframe
        width="560"
        height="315"
        src={urlParams.get("video")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen=""
      ></iframe>
    </>
  );
}
