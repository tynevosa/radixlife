import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import EggStoreScene from './scene/eggStore/index';

const Game: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'phaser-container',
        scene: [EggStoreScene],
        scale: {
          mode: Phaser.Scale.RESIZE, // Resizes dynamically
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        dom: {
          createContainer: true, // Enables the use of HTML elements in the scene
        },
      });
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="phaser-container" className="w-screen h-screen"></div>;
};

export default Game;
