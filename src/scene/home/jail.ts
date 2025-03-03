import { FONT_COLOR_WHITE } from "../../const/ui";

class Jail extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(303, 272);

    // bg
    const bg = scene.add.roundedRectangleGraphics(0, 0, 303, 272, 10);
    bg.isStroked = false;
    bg.fillColor = 0xBCAA71;
    bg.fillAlpha = 0.15;

    // jail_text
    const jail_text = scene.add.text(145, 12, 'JAIL', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // jail_img
    const jail_img = scene.add.image(0, 0, "jail");
    Phaser.Display.Align.To.BottomCenter(jail_img, jail_text, 0, 16);

    this.createRoundedRectTexture(scene, "in_jail_bg", 279, 53, 8.6, 0x202020, 0xffffff, 0.86);
    const in_jail_bg = scene.add.image(0, 0, "in_jail_bg").setOrigin(0.5);
    const avatar_frame = scene.add.nineslice(0, 0, "frame_avatar", undefined, 48, 48, 1, 1, 1, 1);
    const avatar = scene.add.image(0, 0, "user_avatar").setSize(31, 31).setDisplaySize(31, 31);
    const info_text = scene.add.text(0, 0, 'NOT IN PRISON', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE })
    Phaser.Display.Align.To.BottomCenter(in_jail_bg, jail_img, 0, -26);
    Phaser.Display.Align.In.LeftCenter(avatar_frame, in_jail_bg);
    Phaser.Display.Align.In.Center(avatar, avatar_frame);
    Phaser.Display.Align.To.RightCenter(info_text.setPadding(12), avatar_frame);

    this.add([
      bg,
      jail_text,
      jail_img,
      in_jail_bg,
      avatar_frame,
      avatar,
      info_text,
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

export default Jail;
