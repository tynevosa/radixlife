import Button from "../../components/button";
import { FONT_COLOR_PRIMARY } from "../../const/ui";

class BuyEgg extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);

    const egg_img = scene.add.image(0, 0, 'egg');

    const btn_buy = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: 'button-primary',
      width: 179,
      height: 45.77,
      text: 'BUY EGG',
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_PRIMARY },
      onClick: () => {
        scene.scene.start("EggStore");
      }
    })

    Phaser.Display.Align.To.BottomCenter(btn_buy, egg_img, 0, -45.77);

    this.add([egg_img, btn_buy]);

    scene.add.existing(this);
  }

}

export default BuyEgg;
