import Phaser from 'phaser';
import { DEFAULT_SCENE_HEIGHT, MODAL_DEPTH } from '../../const/ui';
import ProgressBar from '../../components/progressbar';
import TimerBlock from './timer';

export default class HatchEggModal extends Phaser.GameObjects.Container {
  private overlay?: Phaser.GameObjects.Graphics;
  private timerEvent?: Phaser.Time.TimerEvent;
  private remainingTime: number; // in seconds
  private totalTime: number; // in seconds
  private progress!: ProgressBar;
  private timerBlock!: TimerBlock;

  constructor(
    scene: Phaser.Scene,
    totalTime: number,
    remainingTime: number,
  ) {
    super(scene);
    this.totalTime = totalTime;
    this.remainingTime = remainingTime;

    const { width, height } = scene.scale;

    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    // Create the overlay as a Graphics object
    this.overlay = scene.add.graphics();
    this.overlay.setAlpha(0);
    this.overlay.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    this.overlay.setDepth(MODAL_DEPTH - 1);

    // Apply blur effect to the overlay
    if (this.scene.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this.overlay.preFX?.addBlur(3); // Adjust the intensity of the blur (higher = more blur)
    }

    // Create the modal background image
    const modalBg = scene.add.image(0, 0, 'hatch-egg-modal').setOrigin(0.5).setScale(scaleFactor);

    this.progress = new ProgressBar(this.scene, modalBg.width * 0.6, 25, 1.5);
    this.progress.setPosition(0, modalBg.displayHeight / 2 + 20 * scaleFactor).setScale(scaleFactor);

    const textHatching = scene.add.text(0, modalBg.displayHeight / 2 + 70 * scaleFactor, 'HATCHING', {
      fontFamily: 'Irish Grover',
      fontSize: '32px',
      color: '#FFFFFF',
      padding: { left: 10, right: 10, top: 5, bottom: 5 },
      align: 'center'
    }).setOrigin(0.5).setStroke('#000000', 2).setScale(scaleFactor);

    this.timerBlock = new TimerBlock(this.scene, this.remainingTime);
    this.timerBlock.setPosition(0, modalBg.displayHeight / 2 + 120 * scaleFactor);
    this.timerBlock.setScale(scaleFactor);

    // Start the countdown timer
    this.startCountdown();

    // Add the elements to the container
    this.add([modalBg, this.progress, textHatching, this.timerBlock]);

    // Set initial modal alpha and scale
    this.setAlpha(0);
    this.setScale(0.8);
    this.setDepth(MODAL_DEPTH);

    // Resize handling
    this.onResize();

    scene.add.existing(this);
    this.scene.scale.on('resize', this.onResize);
  }

  private startCountdown() {
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000, // Every 1 second
      repeat: this.remainingTime - 1,
      callback: () => {
        this.remainingTime--;
        this.progress.setProgress(this.remainingTime / this.totalTime);
        this.timerBlock.updateTime(this.remainingTime);

        if (this.remainingTime <= 0) {
          this.timerEvent?.remove();
          this.hide(); // Auto-close when time reaches 0
        }
      }
    });
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
      onComplete: () => {
        this.emit('hatched'); // Emit hatch event
        this.destroy();
      }
    });
  }

  private onResize = () => {
    if (!this.overlay || !this.progress) return;

    const { width, height } = this.scene.scale;
    this.overlay.clear();
    this.overlay.fillStyle(0x000000, 0.8);
    this.overlay.fillRect(0, 0, width, height);
    this.overlay.preFX?.addBlur(3);

    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    this.setPosition(width / 2, height / 2 - 100 * scaleFactor);
    this.setScale(scaleFactor);
  }
}
