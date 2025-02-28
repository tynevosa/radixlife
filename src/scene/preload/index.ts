class Preload extends Phaser.Scene {

  constructor() {
    super("Preload");
  }

  editorCreate(): void {
    const { width, height } = this.scale;

    const container = this.add.container(0, 0);

    // logo
    const logo = this.add.image(0, 0, "egg");
    Phaser.Display.Align.In.TopLeft(logo, container);

    const container1 = this.add.container(0, 0);

    // loadingText
    const loadingText = this.add.text(0, 0, "Loading...", {});
    loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "Irish Grover", "fontSize": "48px" });

    const container2 = this.add.container(0, 0);
    // progressBar
    const progressBar = this.add.rectangle(0, 0, 400, 40);
    progressBar.setOrigin(0, 0);
    progressBar.fillColor = 14737632;
    progressBar.isFilled = true;
    // progressBarBg
    const progressBarBg = this.add.rectangle(0, 0, 400, 40);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 14737632;
    progressBarBg.isStroked = true;
    // preloadUpdater
    const progressBarFullWidth = progressBar.width;
    this.load.on(Phaser.Loader.Events.PROGRESS, (p: number) => {
      progressBar.width = progressBarFullWidth * p;
    });

    container2.add([progressBar, progressBarBg]);
    Phaser.Display.Align.To.BottomLeft(container2, loadingText);

    container1.add([loadingText, container2]);
    Phaser.Actions.AlignTo([logo, container1], Phaser.Display.Align.RIGHT_TOP);

    container.add([logo, container1]);

    const bounds = container.getBounds();
    const bounds1 = container1.getBounds();
    container1.y = (bounds.height - bounds1.height) / 2;

    container.x = (width - bounds.width) / 2;
    container.y = (height - bounds.height) / 2;
  }

  preload() {
    this.editorCreate();
    this.load.pack("asset-pack", "assets/home/asset-pack.json");
  }

  create() {
    this.scene.start("Home");
  }

}

export default Preload;
