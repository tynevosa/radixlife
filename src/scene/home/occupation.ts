import { FONT_COLOR_WHITE } from "../../const/ui";

class Occupation extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(282.63, 183.42);

    // bg
    const bg = scene.add.roundedRectangleGraphics(0, 0, 282.63, 183.42, 8.83);
    bg.isStroked = false;
    bg.fillColor = 0xB33636;
    bg.fillAlpha = 0.25;

    // occupation_text
    const occupation_text = scene.add.text(0, 0, 'OCCUPATION', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);
    Phaser.Display.Align.In.TopCenter(occupation_text, bg, 0, -17);

    this.createRoundedRectTexture(scene, "in_occupation_bg", 200, 83, 10, 0xB33636, 0xEB8D36, 1.15);
    const in_occupation_bg = scene.add.image(0, 0, "in_occupation_bg").setOrigin(0.5);
    const occupation_title = scene.add.text(0, 0, 'JOBLESS', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE });
    Phaser.Display.Align.To.BottomCenter(in_occupation_bg, occupation_text, 0, 34);
    Phaser.Display.Align.In.Center(occupation_title, in_occupation_bg);

    this.add([
      bg,
      occupation_text,
      in_occupation_bg,
      occupation_title,
    ]);

    scene.add.existing(this);
  }

  createRoundedRectTexture(
    scene: Phaser.Scene,
    key: string,
    width: number,
    height: number,
    radius: number,
    fillColor: number,
    borderColor: number,
    borderWidth: number
  ) {
    // Create a Graphics object
    const graphics = scene.add.graphics();

    // Draw border
    graphics.lineStyle(borderWidth, borderColor, 1);
    graphics.fillStyle(fillColor, 1);

    // Draw rounded rectangle with border
    graphics.fillRoundedRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, radius);
    graphics.strokeRoundedRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, radius);

    // Convert graphics to texture
    graphics.generateTexture(key, width, height);

    // Destroy the graphics object (no longer needed)
    graphics.destroy();
  }

}

export default Occupation;
