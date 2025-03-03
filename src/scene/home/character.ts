import { FONT_COLOR_WHITE } from "../../const/ui";

class Character extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(226, 315);

    this.createRoundedRectTexture(scene, "in_character_bg", 194, 44, 10, 0x202020, 0xFFFFFF, 0.86);
    const in_character_bg = scene.add.image(0, 0, "in_character_bg").setOrigin(0);
    const character_name = scene.add.text(0, 0, 'CHARACTER 1  ▼', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE });
    Phaser.Display.Align.In.Center(character_name, in_character_bg);

    this.add([
      in_character_bg,
      character_name,
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

export default Character;
