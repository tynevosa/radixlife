import Button from "../../components/button";
import { FONT_COLOR_WHITE } from "../../const/ui";

class Store extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(320, 290);

    // store_text
    const store_text = scene.add.text(163, 12, 'STORE', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // store_img
    const store_img = scene.add.image(0, 0, "store");
    Phaser.Display.Align.To.BottomCenter(store_img, store_text, 0, 16);

    const btn_store = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-secondary",
      width: 205.89,
      height: 45.85,
      text: "STORE",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });

    Phaser.Display.Align.To.BottomCenter(btn_store, store_img, 0, -23);

    this.add([
      store_text,
      store_img,
      btn_store,
    ]);

    scene.add.existing(this);
  }

}

export default Store;
