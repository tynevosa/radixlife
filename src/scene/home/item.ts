import Button from "../../components/button";
import { FONT_COLOR_WHITE } from "../../const/ui";

class Item extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(252, 288);

    // item_text
    const item_text = scene.add.text(126, 22, 'OWNED OBJECT', { fontFamily: "Irish Grover", fontSize: "20px", color: FONT_COLOR_WHITE }).setOrigin(0.5);

    // item_img
    const item_img = scene.add.image(0, 0, "item-box");
    Phaser.Display.Align.To.BottomCenter(item_img, item_text, 0, 16);

    const btn_item = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-secondary",
      width: 112.29,
      height: 45.77,
      text: "MY ITEMS",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_WHITE },
      onClick: () => {

      }
    });

    Phaser.Display.Align.To.BottomCenter(btn_item, item_img);

    this.add([
      item_text,
      item_img,
      btn_item,
    ]);

    scene.add.existing(this);
  }

}

export default Item;
