class UserHaveItem extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    title: string,
  ) {
    super(scene);

    // const bg = new CustomEllipse(scene);
    const bg = scene.add.circle(0, 0, 25, 0x202020, 1);
    bg.setOrigin(0);
    // const ic = scene.add.image(0, 0, icon);

    // Phaser.Display.Align.In.Center(ic, bg);

    const ti = scene.add.text(0, 0, title, { "fontFamily": "Irish Grover", "fontSize": "14px" });
    Phaser.Display.Align.To.BottomCenter(ti, bg, 0, 6);

    this.add([bg, ti]);
    scene.add.existing(this);
  }
}

class UserHave extends Phaser.GameObjects.Container {

  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);

    // have_cloth
    const have_cloth = new UserHaveItem(scene, 'CLOTH');
    this.resizeContainer(have_cloth);
    const have_house = new UserHaveItem(scene, 'HOUSE');
    this.resizeContainer(have_house);
    const have_desire = new UserHaveItem(scene, 'DESIRE');
    this.resizeContainer(have_desire);

    this.add([have_cloth, have_house, have_desire]);
    Phaser.Actions.AlignTo(this.getAll(), Phaser.Display.Align.RIGHT_CENTER, 12);

    scene.add.existing(this);
  }

  resizeContainer(container: Phaser.GameObjects.Container) {
    const bounds = container.getBounds(); // Get new size
    container.setSize(bounds.width, bounds.height); // Update container size
  }
}

export default UserHave;
