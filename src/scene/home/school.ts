import Button from "../../components/button";
import { FONT_COLOR_WHITE } from "../../const/ui";

class School extends Phaser.GameObjects.Container {
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

    // school_text
    const school_text = scene.add.text(152, 29, 'SCHOOL', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // school_img
    const school_img = scene.add.image(0, 0, "school");
    Phaser.Display.Align.To.BottomCenter(school_img, school_text, 0, 16);

    const btn_school = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-secondary",
      width: 205.89,
      height: 45.85,
      text: "SCHOOL",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });

    Phaser.Display.Align.To.BottomCenter(btn_school, school_img, 0, -23);

    this.add([
      bg,
      school_text,
      school_img,
      btn_school,
    ]);

    scene.add.existing(this);
  }

}

export default School;
