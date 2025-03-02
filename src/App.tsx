import { useEffect, useState, createElement } from 'react';
import Game from './Game';
import { DEFAULT_SCENE_HEIGHT } from './const/ui';
import { dAppToolkit } from './utils/radix';

function App() {
  const [buttonPos, setButtonPos] = useState<{ right: number, top: number }>();

  const updateConnectButtonStyles = () => {
    const scaleFactor = window.innerHeight / DEFAULT_SCENE_HEIGHT
    const width = Math.max(206 * scaleFactor);
    const height = Math.max(55, scaleFactor);
    document.documentElement.style.setProperty("--radix-connect-button-width", `${width}px`);
    document.documentElement.style.setProperty("--radix-connect-button-height", `${height}px`);
    setButtonPos({ right: 30 * scaleFactor, top: 45 * scaleFactor })
  };

  useEffect(() => {
    updateConnectButtonStyles();
    dAppToolkit.buttonApi.setMode('dark');
    window.addEventListener("resize", updateConnectButtonStyles);
    return () => window.removeEventListener("resize", updateConnectButtonStyles);
  }, [])

  return (
    <>
      <Game />
      <div id='radix-connect-button' style={{
        position: 'absolute',
        right: `${buttonPos?.right}px`,
        top: `${buttonPos?.top}px`,
      }} className='hidden'>
        {createElement("radix-connect-button")}
      </div>
    </>
  );
}

export default App
