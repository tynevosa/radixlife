import Phaser from "phaser";
import RoundedRectangleGraphics from "./RoundedRectangleGraphics";

// Register the new game object with the GameObjectFactory
declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      roundedRectangleGraphics(
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radius?: number,
        fillColor?: number,
        fillAlpha?: number,
        strokeTop?: boolean,
        strokeWidth?: number
      ): RoundedRectangleGraphics;
    }
  }
}

export default function registerRoundedRectangleGraphicsFactory() {
  Phaser.GameObjects.GameObjectFactory.register("roundedRectangleGraphics",
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number) {
      return this.displayList.add(new RoundedRectangleGraphics(this.scene, x, y, width, height));
    });
}