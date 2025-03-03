import Button from "../../components/button";
import { FONT_COLOR_PRIMARY } from "../../const/ui";

class Bank extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(302, 563);

    // bg
    const bg = scene.add.roundedRectangleGraphics(0, 0, 320, 378, 10);
    bg.isStroked = false;
    bg.fillColor = 0xBCAA71;
    bg.fillAlpha = 0.15;

    // dollar_frame
    const dollar_frame = scene.add.nineslice(30, 36, "frame_other", undefined, 44.5, 44.5, 10, 10, 10, 10).setOrigin(0, 0);
    const dollar = scene.add.image(0, 0, 'dollar-bunch');
    Phaser.Display.Align.In.Center(dollar, dollar_frame);
    // price_frame
    const price_frame = scene.add.nineslice(0, 0, "frame_other", undefined, 211, 44.5, 10, 10, 10, 10);
    const price = scene.add.text(0, 0, "$3005", { fontFamily: "Irish Grover", fontSize: "18px" });
    const price_plus = new Button({
      scene: scene,
      x: 0, y: 0,
      texture: 'balance_plus',
      onClick: () => {

      }
    });
    Phaser.Display.Align.To.RightCenter(price_frame, dollar_frame, 12);
    Phaser.Display.Align.In.Center(price, price_frame);
    Phaser.Display.Align.In.RightCenter(price_plus, price_frame, -12);

    // bank_img
    const bank_img = scene.add.image(0, 0, "bank").setOrigin(0, 0);
    Phaser.Display.Align.To.BottomLeft(bank_img, dollar_frame, 0, 16);

    // debit_frame
    const debit_text = scene.add.text(0, 0, "DEBIT", { fontFamily: "Irish Grover", fontSize: "18px" });
    debit_text.setOrigin(0, 0.5);
    const debit_frame = scene.add.nineslice(0, 0, "frame_other", undefined, 185, 40, 10, 10, 10, 10);
    debit_frame.setOrigin(0, 0.5);
    const debit = scene.add.text(0, 0, "-$252.36", { fontFamily: "Irish Grover", fontSize: "22px", color: "#ff0000" });
    debit.setOrigin(0, 0.5);
    Phaser.Display.Align.To.BottomLeft(debit_text, bank_img, 0, 16);
    Phaser.Display.Align.To.RightCenter(debit_frame, debit_text, 16);
    Phaser.Display.Align.In.Center(debit, debit_frame);

    const btn_deposit = new Button({
      scene: scene,
      x: 16,
      y: 318,
      texture: "button-primary",
      width: 136,
      height: 46,
      text: "DEPOSIT",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_PRIMARY },
      onClick: () => {

      }
    });
    const btn_withdraw = new Button({
      scene: scene,
      x: 0,
      y: 0,
      texture: "button-other",
      width: 136,
      height: 46,
      text: "WITHDRAW",
      textStyle: { fontFamily: "Irish Grover", fontSize: "14.34px", color: FONT_COLOR_PRIMARY },
      onClick: () => {

      }
    });
    Phaser.Display.Align.To.RightCenter(btn_withdraw, btn_deposit, 12);

    this.add([
      bg,
      dollar_frame,
      dollar,
      price_frame,
      price,
      price_plus,
      bank_img,
      debit_text, debit_frame, debit,
      btn_deposit,
      btn_withdraw,
    ]);

    scene.add.existing(this);
  }

}

export default Bank;
