interface ButtonConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  width?: number;
  height?: number;
  text?: string;
  textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
  onClick: () => void;
}

export default class Button extends Phaser.GameObjects.Container {
  public buttonText?: Phaser.GameObjects.Text;
  private buttonTexture: Phaser.GameObjects.NineSlice | Phaser.GameObjects.Image;

  constructor(
    config: ButtonConfig
  ) {
    const {
      scene,
      x,
      y,
      texture,
      width,
      height,
      text,
      textStyle,
      onClick,
    } = config;

    super(scene, x, y); // Call the Container constructor

    if (width && height) {
      // Create the NineSlice button texture
      this.buttonTexture = new Phaser.GameObjects.NineSlice(scene, 0, 0, texture, undefined, width, height, 10, 10, 10, 10);
    } else {
      this.buttonTexture = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    }

    // Add button texture to the container
    this.add(this.buttonTexture);

    if (text && textStyle) {
      // Create the text object inside the container
      this.buttonText = scene.add.text(0, 0, text, textStyle);

      // Add text to the container
      this.add(this.buttonText);

      // Center the text inside the button
      Phaser.Display.Align.In.Center(this.buttonText, this.buttonTexture);
    }

    const bounds = this.getBounds();
    this.setSize(bounds.width, bounds.height);

    // Adjust the container position based on the origin
    this.x = this.x + this.buttonTexture.width * 0.5;
    this.y = this.y + this.buttonTexture.height * 0.5;

    // Make the button interactive
    this.setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.setScale(0.95); // Click effect
        onClick && onClick();
      })
      .on("pointerup", () => {
        this.setScale(1); // Restore scale
      })
      .on("pointerover", () => {
        this.buttonTexture.setTint(0xcccccc); // Hover effect
      })
      .on("pointerout", () => {
        this.buttonTexture.clearTint(); // Remove hover effect
        this.setScale(1);
      });

    // Add the container to the scene
    scene.add.existing(this);
  }
}
