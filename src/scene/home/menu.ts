class MenuItem extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    title: string,
    icon: string,
  ) {
    super(scene);
    // text
    const menu_text = scene.add.text(0, 0, title, { fontFamily: "Irish Grover", fontSize: "14px" });
    // frame
    const menu_frame = scene.add.image(0, 0, "frame_other").setInteractive({ cursor: 'pointer' });
    // icon
    const menu_icon = scene.add.image(0, 0, icon);
    this.add([menu_text, menu_frame, menu_icon]);
    Phaser.Display.Align.In.Center(menu_icon, menu_frame);
    Phaser.Display.Align.To.BottomCenter(menu_text, menu_frame, 0, 4);
  }
}

class Menu extends Phaser.GameObjects.Container {

  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);

    // notification
    const notification = new MenuItem(this.scene, "NOTIFICATION", "icon_notification");
    // log
    const log = new MenuItem(this.scene, "LOG", "icon_log");
    // chat
    const chat = new MenuItem(this.scene, "CHAT", "icon_chat");

    this.add([notification, log, chat]);
    Phaser.Actions.AlignTo(this.getAll(), Phaser.Display.Align.RIGHT_CENTER, 90);

    scene.add.existing(this);
  }

}

export default Menu;
