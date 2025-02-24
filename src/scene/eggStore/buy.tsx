import Phaser from 'phaser';
import { DEFAULT_SCENE_HEIGHT, MODAL_DEPTH } from '../../const/ui';

export default class BuyEggModal extends Phaser.GameObjects.Container {
  private overlay?: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);

    const { width, height } = scene.scale;

    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    this.overlay = scene.add.graphics();
    this.overlay.setAlpha(0);
    this.overlay.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    this.overlay.setDepth(MODAL_DEPTH - 1);

    const modalBg = scene.add.image(0, 0, 'buy-egg-modal').setOrigin(0.5).setScale(scaleFactor);

    const closeButton = scene.add.image(modalBg.x + modalBg.displayWidth / 2 + 2, modalBg.y - modalBg.displayHeight / 2 + 145 * scaleFactor, 'modal-close')
      .setOrigin(0.5).setScale(scaleFactor)
      .setInteractive({ cursor: 'pointer' });

    const buyButton = scene.add.text(modalBg.x, modalBg.y + modalBg.height * 0.38 * scaleFactor, 'BUY EGG', {
      fontFamily: 'Irish Grover',
      fontSize: '45px',
      color: '#720E20',
      padding: { left: 10, right: 10, top: 5, bottom: 5 },
      align: 'center'
    }).setOrigin(0.5).setScale(scaleFactor).setInteractive({ cursor: 'pointer' });

    closeButton.on('pointerdown', () => {
      this.hide();
    });

    buyButton.on('pointerdown', () => {
      this.hide();
      this.emit('bought'); // Emit buy event
    });

    // Highlight effect using blend mode on hover
    buyButton.on('pointerover', () => {
      buyButton.setStyle({ color: '#FECC0B' });
    });

    buyButton.on('pointerout', () => {
      buyButton.setStyle({ color: '#720E20' });
    });

    // Create a container for the modal elements
    this.add([modalBg, closeButton, buyButton]);
    this.setAlpha(0);
    this.setScale(0.8);
    this.setDepth(MODAL_DEPTH);
    this.onResize();

    scene.add.existing(this);
    this.scene.scale.on('resize', this.onResize);
  }

  public show = () => {
    this.scene.tweens.add({
      targets: [this, this.overlay],
      alpha: 1,
      scale: 1,
      duration: 500,
      ease: 'Power2',
    });
  }

  private hide = () => {
    this.scene.tweens.add({
      targets: [this, this.overlay],
      alpha: 0,
      duration: 500,
      ease: 'Power2',
    });
  }

  private onResize = () => {
    if (!this.overlay) return;

    const { width, height } = this.scene.scale;
    this.setPosition(width / 2, height / 2);
    this.overlay.clear();
    this.overlay.fillStyle(0x000000, 0.8);
    this.overlay.fillRect(0, 0, width, height);

    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    this.setScale(scaleFactor);
  }
}
