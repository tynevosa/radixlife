export default class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "assets/preload/asset-pack.json");
  }
  create() {
    this.scene.start("Preload");
  }
}