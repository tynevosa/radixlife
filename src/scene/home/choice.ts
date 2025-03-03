import Button from "../../components/button";
import { FONT_COLOR_WHITE } from "../../const/ui";

class Choice extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(320, 290);

    // choice_text
    const choice_text = scene.add.text(160, 26, 'CHOICE', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // choice_img
    const choice_img = scene.add.image(0, 0, "board");
    Phaser.Display.Align.To.BottomCenter(choice_img, choice_text, 0, 17);

    const btn_choice = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-secondary",
      width: 205.89,
      height: 45.85,
      text: "CHOICE",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });

    Phaser.Display.Align.To.BottomCenter(btn_choice, choice_img, 0, 11.5);

    this.add([
      choice_text,
      choice_img,
      btn_choice,
    ]);

    scene.add.existing(this);
  }

}

export default Choice;
