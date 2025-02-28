class UserStatus extends Phaser.GameObjects.Container {

  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);

    // frame_avatar
    const frame_avatar = scene.add.image(0, 0, "frame_avatar");
    Phaser.Display.Align.In.TopLeft(frame_avatar, this);

    const container = scene.add.container();

    // frame_name
    const frame_name = scene.add.image(0, 0, "frame_name");

    const container1 = scene.add.container();

    // text_age
    const text_age = scene.add.text(0, 0, "AGE", { "fontFamily": "Irish Grover", "fontStyle": "bold" });
    // frame_age
    const frame_age = scene.add.nineslice(0, 0, "frame_other", undefined, 53.53, 31.62, 5, 5, 5, 5);
    // level_bar_frame
    const level_bar_frame = scene.add.image(0, 0, "frame_progress");

    container1.add([text_age, frame_age, level_bar_frame])
    Phaser.Actions.AlignTo([text_age, frame_age, level_bar_frame], Phaser.Display.Align.RIGHT_CENTER, 8)

    container.add([frame_name, container1]);
    Phaser.Display.Align.To.BottomLeft(container1, frame_name, 0, 4);

    this.add([frame_avatar, container]);
    Phaser.Display.Align.To.TopRight(container, frame_avatar, 8);

    // align container center vertically within this
    const bounds = this.getBounds();
    const bounds1 = container.getBounds();
    container.y = (bounds.height - bounds1.height) / 2;

    scene.add.existing(this);
  }

}

export default UserStatus;
