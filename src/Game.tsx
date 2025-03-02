import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import Boot from './scene/boot/index';
import Preload from './scene/preload/index';
import Home from './scene/home/index';
import EggStore from './scene/eggStore/index';
import registerRoundedRectangleGraphicsFactory from './components/roundedRectangle/registerRoundedRectangleGraphicsFactory';

const Game: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'root',
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        dom: {
          createContainer: true, // Enables the use of HTML elements in the scene
        },
      });

      registerRoundedRectangleGraphicsFactory();
      gameRef.current.scene.add("EggStore", EggStore);
      gameRef.current.scene.add("Home", Home);
      gameRef.current.scene.add("Preload", Preload);
      gameRef.current.scene.add("Boot", Boot, true);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <></>;
};

export default Game;
