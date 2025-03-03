import Button from "../../components/button";
import { FONT_COLOR_WHITE } from "../../const/ui";

class Job extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(226, 315);

    // job_text
    const job_text = scene.add.text(103, 12, 'JOB', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // bg
    const bg = scene.add.roundedRectangleGraphics(0, 0, 303, 272, 10);
    bg.isStroked = false;
    bg.fillColor = 0xB33636;
    bg.fillAlpha = 0.25;
    Phaser.Display.Align.To.BottomCenter(bg, job_text, 0, 9);

    this.createRoundedRectTexture(scene, "in_job_bg", 200, 83, 10, 0x202020, 0xEB8D36, 1.15);
    const in_job_bg = scene.add.image(0, 0, "in_job_bg").setOrigin(0.5);
    const job_title = scene.add.text(0, 0, 'RUN AN ERRAN', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE });
    Phaser.Display.Align.In.TopCenter(in_job_bg, bg, 0, -39);
    Phaser.Display.Align.In.Center(job_title, in_job_bg);

    const btn_job_accept = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-primary",
      width: 179,
      height: 45.95,
      text: "ACCEPT JOB",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });
    Phaser.Display.Align.To.BottomCenter(btn_job_accept, in_job_bg, 0, 25);
    const btn_job_decline = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-red",
      width: 179,
      height: 45.95,
      text: "DECLINE",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });
    Phaser.Display.Align.To.BottomCenter(btn_job_decline, btn_job_accept, 0, 4);

    this.add([
      job_text,
      bg,
      in_job_bg,
      job_title,
      btn_job_accept,
      btn_job_decline,
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

export default Job;
