import RoundedRectangleGraphics from './RoundedRectangleGraphics';
import RoundedRectangleImage from './RoundedRectangleImage';
export type FillGradientParameters = Parameters<typeof Phaser.GameObjects.Graphics.prototype.fillGradientStyle>;

export default interface IRoundedRectangleGraphics {

  width: number;
  height: number;

  originX: number;
  originY: number;

  radiusTopLeft: number;
  radiusTopRight: number;
  radiusBottomLeft: number;
  radiusBottomRight: number;
  isFilled: boolean;
  fillColor: number;
  fillAlpha: number;
  // Allow for a gradient fill color
  isGradient: boolean;
  fillGradient: FillGradientParameters;
  isStroked: boolean;
  lineWidth: number;
  strokeColor: number;
  strokeAlpha: number;
  // Allow for custom stroke sides
  strokeTop: boolean;
  strokeRight: boolean;
  strokeBottom: boolean;
  strokeLeft: boolean;
  shadowColor: number;
  shadowAlpha: number;
  shadowOffsetLeft: number;
  shadowOffsetRight: number;
  shadowOffsetTop: number;
  shadowOffsetBottom: number;

  setSize(width: number, height: number): void;

  redraw(): void;
}

declare namespace Phaser.GameObjects {

  export interface GameObjectFactory {

    roundedRectangleGraphics(x: number, y: number, width: number, height: number): RoundedRectangleGraphics;
    roundedRectangleImage(x: number, y: number, width: number, height: number): RoundedRectangleImage;
  }
}