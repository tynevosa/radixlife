import Phaser from 'phaser';

export default class Label extends Phaser.GameObjects.Sprite {
  textObject: Phaser.GameObjects.Text;
  textPosition!: { x: number, y: number };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    textObject: Phaser.GameObjects.Text,
    parent?: Phaser.GameObjects.Container,
    width?: number, // Optional width
    height?: number,  // Optional height
    textPositionX: number = 0.5, // Horizontal text position: 0 = left, 0.5 = center, 1 = right
    textPositionY: number = 0.5, // Vertical text position: 0 = top, 0.5 = center, 1 = bottom
  ) {
    // Create the base sprite with the texture as the background image
    super(scene, x, y, texture);

    // Set the width and height based on the provided values or use the original texture size
    const originalWidth = this.width;
    const originalHeight = this.height;

    // If no width or height is passed, use the original size from the texture
    this.setDisplaySize(width || originalWidth, height || originalHeight);

    // Set the origin of the background (top-left corner by default)
    this.setOrigin(0, 0); // Default to top-left corner

    // Add the background (this is the Sprite) and the text as children to the label
    parent ? parent.add(this) : scene.add.existing(this);

    // Set the text object
    if (!textObject) {
      throw new Error('Text object must be provided');
    }
    this.textObject = textObject;
    this.textPosition = { x: textPositionX, y: textPositionY };

    // Add the text object to the scene
    parent ? parent.add(this.textObject) : scene.add.existing(this.textObject);

    // Position the text relative to the label's background size
    this.positionText();

    // Set the position of the label itself (to ensure the label and text are aligned)
    this.setPosition(x, y);
  }

  /**
   * Position the text inside the label.
   * @param textPositionX: relative horizontal position (0 = left, 0.5 = center, 1 = right)
   * @param textPositionY: relative vertical position (0 = top, 0.5 = center, 1 = bottom)
   */
  private positionText() {
    const width = this.displayWidth;
    const height = this.displayHeight;

    if (!this.textObject) {
      console.error('Text object is missing!');
      return;
    }

    // Set the text object's origin to (0.5, 0.5) for centering
    this.textObject.setOrigin(0.5, 0.5);

    // Calculate the x position based on textPositionX (0 = left, 1 = right, 0.5 = center)
    const xOffset = width * this.textPosition.x; // This shifts the text relative to the background's width

    // Calculate the y position based on textPositionY (0 = top, 1 = bottom, 0.5 = center)
    const yOffset = height * this.textPosition.y; // This shifts the text relative to the background's height

    // Set the text's position based on the calculated offsets
    this.textObject.setPosition(this.x + xOffset, this.y + yOffset);
  }

  /**
   * Override the setScale method to scale both the label and the text object.
   */
  setScale(s: number): this {
    super.setScale(s);

    this.textObject.setScale(s);

    this.positionText();

    return this;
  }

  /**
   * Override the setOrigin method to reposition the text when the origin changes.
   */
  setOrigin(x: number, y: number): this {
    super.setOrigin(x, y);

    this.positionText();

    return this;
  }
}
